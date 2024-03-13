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
import { limiter } from "@/lib/Limiter";

const router = createEdgeRouter<NextRequest, NextResponse>();
// uploading two files
router.use(multer().any()).post(async (req: NextRequest, res: NextResponse) => {
  const sessionId = cookies().get("session")?.value;
  const requestUrl = new URL(req.url);

  if (!sessionId) {
    return NextResponse.redirect(requestUrl.origin + "/auth/login");
  }

  const { user } = await lucia.validateSession(sessionId);
  if (!user) {
    return NextResponse.redirect(requestUrl.origin + "/auth/login");
  }

  const formData = await req.formData();
  if (!formData.get("expires_at")) {
    return NextResponse.redirect(
      requestUrl.origin + "/auth/sponsorship/create?error=invalid_date",
      { status: 400 },
    );
  }

  try {
    moment(formData.get("expires_at") as string).toDate();
  } catch (error) {
    return NextResponse.redirect(
      requestUrl.origin + "/auth/sponsorship/create?error=invalid_date",
      { status: 400 },
    );
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

  const titleZod = z.string().min(5);
  const descriptionZod = z.string().min(10);
  const amountZod = z.string().min(2).max(6);
  const categoryZod = z.string().max(10).min(5);
  const expiration_dateZod = z
    .date()
    .min(new Date())
    .max(new Date(new Date().setFullYear(new Date().getFullYear() + 1)));

  const title = titleZod.safeParse(processedData.title);
  const description = descriptionZod.safeParse(processedData.description);
  const amount = amountZod.safeParse(processedData.amount);
  const category = categoryZod.safeParse(processedData.category);
  const expiration_date = expiration_dateZod.safeParse(
    processedData.expiration_date,
  );

  if (!title.success) {
    return NextResponse.redirect(
      requestUrl.origin +
        "/auth/sponsorship/create?error=sponsorship_invalid_title",
    );
  } else if (!description.success) {
    return NextResponse.redirect(
      requestUrl.origin +
        "/auth/sponsorship/create?error=sponsorship_invalid_description",
    );
  } else if (!amount.success) {
    return NextResponse.redirect(
      requestUrl.origin +
        "/auth/sponsorship/create?error=sponsorship_invalid_amount",
    );
  } else if (!category.success) {
    return NextResponse.redirect(
      requestUrl.origin +
        "/auth/sponsorship/create?error=sponsorship_invalid_category",
    );
  } else if (!expiration_date.success) {
    return NextResponse.redirect(
      requestUrl.origin +
        "/auth/sponsorship/create?error=sponsorship_invalid_expiration_date",
    );
  }

  if (Number.isNaN(Number.parseFloat(amount.data))) {
    return NextResponse.redirect(
      requestUrl.origin + "/auth/sponsorship/create?error=invalid_amount",
      { status: 400 },
    );
  }

  if (
    !(
      category.data === "other" ||
      category.data === "cosmetics" ||
      category.data === "fashion" ||
      category.data === "technology"
    )
  ) {
    return NextResponse.redirect(
      requestUrl.origin + "/auth/sponsorship/create?error=invalid_category",
      { status: 400 },
    );
  }

  if (
    Number.parseFloat(amount.data) < 50 ||
    Number.parseFloat(amount.data) > 100000
  ) {
    return NextResponse.redirect(
      requestUrl.origin + "/auth/sponsorship/create?error=invalid_amount",
      { status: 400 },
    );
  }

  const image = formData.get("image") as File;

  if (!image) {
    return NextResponse.redirect(
      requestUrl.origin + "/auth/sponsorship/create?error=invalid_image",
      { status: 400 },
    );
  }

  const parser = new DatauriParser();

  try {
    // create image
    const createImage = async (img: any) => {
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
    // saving information
    const createdImage = await createImage(image);
    const image_url = createdImage.url;
    const image_id = createdImage.public_id;
    const image_signature = createdImage.signature;

    await prisma.sponsorship.create({
      data: {
        image_url,
        image_id,
        image_signature,
        sponsorId: user.id,
        title: title.data,
        description: description.data,
        amount: parseFloat(parseFloat(amount.data).toFixed(2)),
        category: category.data,
        expires_at: expiration_date.data,
      },
    });
    // creating a new card
    return NextResponse.redirect(requestUrl.origin + "/auth/sponsorship");
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(
      requestUrl.origin + "/auth/sponsorship/create?error=unknown_error",
      { status: 400 },
    );
  }
});
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest, res: NextResponse) {
  const remaining = await limiter.removeTokens(1);
  const requestUrl = new URL(req.url);

  if (remaining < 0) {
    return NextResponse.redirect(requestUrl.origin + "/too-many-requests", {
      status: 429,
    });
  }

  return router.run(req, res);
}
