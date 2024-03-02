
'use server';
import { z } from "zod";
import { sendMail } from "./SendMail";

export async function ContactEmailSend(formData: FormData) {
  const uncheckedData = {
    email: formData.get("email"),
    title: formData.get("title"),
    message: formData.get("message"),
  };

  const dataZod = z.object({
    email: z.string().email(),
    title: z.string(),
    message: z.string(),
  });

  const dataZodResult = dataZod.safeParse(uncheckedData);

  if (!dataZodResult.success) {
    return { error: "Invalid values", data: null };
  }

  try {
    await sendMail({
      to: dataZodResult.data.email,
      subject: dataZodResult.data.title,
      text: dataZodResult.data.message,
    })
    return { data: null, error: null };
  } catch (error) {
    return { error: "Could not send data", data: null };
  }
}
