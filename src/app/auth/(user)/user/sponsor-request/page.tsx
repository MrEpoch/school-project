import ErrorHandler from "@/components/ErrorHandler";
import { sendMail } from "@/lib/SendMail";
import { authChecker } from "@/lib/checkAuth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { z } from "zod";

async function beSponsor(formData: FormData) {
  "use server";

  const email = formData.get("email");
  const message = formData.get("message");
  const phone = formData.get("phone");

  const emailZod = z.string().email();
  const messageZod = z.string().min(10);
  const phoneZod = z.string().min(10).max(10);

  const parsedEmail = emailZod.safeParse(email);
  const parsedMessage = messageZod.safeParse(message);
  const parsedPhone = phoneZod.safeParse(phone);

  if (!parsedEmail.success) {
    redirect("/auth/user/sponsor-request?error=invalid_email");
  } else if (!parsedMessage.success) {
    redirect("/auth/user/sponsor-request?error=invalid_message");
  } else if (!parsedPhone.success) {
    redirect("/auth/user/sponsor-request?error=invalid_phone");
  }

  try {
    await sendMail({
      to: process.env.MAIL_TO,
      subject: "Sponsorship Request",
      text: message + "\n\n" + email,
    });

    const user = await authChecker();

    await prisma.beSponsorRequest.create({
      data: {
        company_email: parsedEmail.data,
        company_phone: parsedPhone.data,
        userId: user.id,
      },
    });
    redirect("/auth/user/sponsor-request/success");
  } catch (e) {
    redirect("/auth/user/sponsor-request?error=unknown_error");
  }
}

// Later i will add some cookies throttle to prevent spam

export default function Page() {
  return (
    <main className="min-h-screen w-full dark:bg-darkmode-500 py-12">
      <div className="flex flex-col gap-10 items-center justify-center h-screen max-w-screen-xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <ErrorHandler />
        <h3 className="text-xl font-bold mb-5">Please fill out the form</h3>
        <form action={beSponsor} className="max-w-sm mx-auto w-full">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
              placeholder="mail@company.com"
              required
            />
          </div>
          {/* Phone number then company name */}
          <div className="mb-5">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
              placeholder="123-456-789"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              minLength={10}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write some info to process your be sponsor request..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="text-white bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
