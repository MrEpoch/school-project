import { createEdgeRouter } from "next-connect";
import multer from "multer";
import path from "path";
import DatauriParser from "datauri/parser";
import cloudinary from "@/lib/Cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { z } from "zod";
import { prisma } from "@/lib/db";
import moment from "moment";

interface NextRequestWithParams extends NextRequest {
  params: {
    id: string;
  };
}

export const dynamic = "force-dynamic";
export const dynamicParams = true;

const router = createEdgeRouter<NextRequestWithParams, null>();
// uploading two files
router.use(multer().any()).put(async (req: NextRequestWithParams) => {
  const sessionId = cookies().get("session")?.value;

  if (!sessionId) {
    console.log("No id");
    return NextResponse.redirect("/auth/login");
  }

  const { user } = await lucia.validateSession(sessionId);
  if (!user) {
    console.log("No user");
    return NextResponse.redirect("/auth/login");
  }

  const formData = await req.formData();
  if (!formData.get("expires_at")) {
    return NextResponse.json({ error: "No expiration" }, { status: 400 });
  }

  try {
    moment(formData.get("expires_at") as string).toDate();
  } catch (error) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  const processedData = {
    title: formData.get("title"),
    description: formData.get("description"),
    amount: formData.get("reward"),
    category: formData.get("category"),
    expiration_date: moment(
      formData.get("expires_at") as string,
      "YYYY-MM-DD",
    ).toDate(),
  };

  const createSponsorshipSchema = z.object({
    title: z.string().min(5),
    description: z.string().min(10),
    amount: z.string().min(1),
    category: z.string().max(10).min(5),
    expiration_date: z
      .date()
      .min(new Date())
      .max(new Date(new Date().setFullYear(new Date().getFullYear() + 1))),
  });

  const result = createSponsorshipSchema.safeParse(processedData);

  if (!result.success) {
    console.log(result.error);
    return NextResponse.json(
      {
        error: result.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  if (Number.isNaN(Number.parseFloat(result.data.amount))) {
    return NextResponse.json(
      {
        error: "Amount must be a number",
      },
      { status: 400 },
    );
  }

  if (
    !(
      result.data.category === "other" ||
      result.data.category === "cosmetics" ||
      result.data.category === "fashion" ||
      result.data.category === "technology"
    )
  ) {
    return NextResponse.json(
      {
        error: "Invalid category",
      },
      { status: 400 },
    );
  }

  const sponsorship = await prisma.sponsorship.findUnique({
    where: {
      id: req.nextUrl.searchParams.get("id") as string,
      sponsorId: user.id,
    },
  });

  if (!sponsorship) {
    return NextResponse.redirect("/auth/sponsorship");
  }

  const image = formData.get("image") as File;
  if (image) {
    const parser = new DatauriParser();
    try {
      // create image
      const createImage = async (img: any) => {
        console.log(img);
        const base64Image = parser.format(
          path.extname(img.name).toString(),
          await img.arrayBuffer(),
        );
        const uploadedImageResponse = await cloudinary.v2.uploader.upload(
          base64Image.content as string,
          { resource_type: "image" },
        );
        return uploadedImageResponse;
      };
      await cloudinary.v2.uploader.destroy(sponsorship.image_id as string);
      const createdImage = await createImage(image);
      const image_url = createdImage.url;
      const image_id = createdImage.public_id;
      const image_signature = createdImage.signature;

      await prisma.sponsorship.update({
        where: {
          id: req.params.id,
          sponsorId: user.id,
        },
        data: {
          image_url,
          image_id,
          image_signature,
          title: result.data.title,
          description: result.data.description,
          amount: parseFloat(parseFloat(result.data.amount).toFixed(2)),
          sponsorId: user.id,
          category: result.data.category,
          expires_at: result.data.expiration_date,
        },
      });
      // creating a new card
      return NextResponse.redirect("/auth/sponsorship");
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error, data: null }, { status: 500 });
    }
  } else {
    await prisma.sponsorship.update({
      where: {
        id: req.nextUrl.searchParams.get("id") as string,
        sponsorId: user.id,
      },
      data: {
        title: result.data.title,
        description: result.data.description,
        amount: parseFloat(parseFloat(result.data.amount).toFixed(2)),
        sponsorId: user.id,
        category: result.data.category,
        expires_at: result.data.expiration_date,
      },
    });
    // creating a new card
    return NextResponse.redirect("/auth/sponsorship");
  }
});
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function PUT(
  req: NextRequestWithParams,
  { params }: { params: { id: string } },
) {
  const paramsZ = z.string().uuid();
  const paramsV = await paramsZ.parseAsync(params.id);
  req.params = { id: paramsV };
  return router.run(req, null);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  console.log(params);
  const sessionId = cookies().get("session")?.value;
  if (!sessionId) {
    return NextResponse.redirect("/auth/login");
  }
  const { user } = await lucia.validateSession(sessionId);
  if (!user) {
    return NextResponse.redirect("/auth/login");
  }

  const zodParams = z.string();
  const paramsV = await zodParams.parseAsync(params.id);

  const deleted = await prisma.sponsorship.delete({
    where: {
      id: paramsV,
      sponsorId: user.id,
    },
  });

  if (deleted) {
    await cloudinary.v2.uploader.destroy(deleted.image_id as string);
  }

  return NextResponse.redirect("/auth/sponsorship");
}
