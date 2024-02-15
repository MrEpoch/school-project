import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { createUser } from "@/lib/UserActions";
import { generateEmailVerificationCode } from "@/lib/EmailVerify";
import { sendMail } from "@/lib/SendMail";
import { lucia } from "@/lib/auth";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = formData.get('email') ;
    const password = formData.get('password') ;

    console.log("it rendered 1");
    
    const emailZod = z.string().email();
    const passwordZod = z.string().min(8);

    console.log("it rendered 2");
    
    const emailResult = emailZod.safeParse(email);
    const passwordResult = passwordZod.safeParse(password);

    console.log("it rendered 3");
    
    if (!emailResult.success) {
      console.log("false mail");
      return NextResponse.json({error: "Invalid email"}, {status: 400});
    } else if (!passwordResult.success) {
      console.log("false password");
      return NextResponse.json({error: "Invalid password"}, {status: 400});
    }
    console.log("it rendered 4");
    


    try { 
      console.log("it rendered 5");
      const user = await createUser(emailResult.data, passwordResult.data);

      if (!user) {
        return NextResponse.json({error: "User creation failed"}, {status: 500});
      }
      console.log("it rendered 6");
    
      const verificationCode = await generateEmailVerificationCode(user.id, user.email);
      console.log("it rendered 7");
    
      await sendMail({ to: user.email, subject: 'Verify your email', text: `Your verification code is ${verificationCode}`})

      console.log("it rendered 8");
    
      const session = await lucia.createSession(user.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      console.log("it rendered 9");
      
      console.log("it rendered 10");
    
      cookies().set('session', sessionCookie.serialize(), { path: '/' });
      return NextResponse.redirect(requestUrl.origin + "/auth/verify-email", {
        status: 301,
      })
    } catch (error) {
      console.log(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return NextResponse.redirect(
            requestUrl.origin + "/signup?error=email_exists",
            {
              status: 301,
            },
          );
        }
      }
    }
}
