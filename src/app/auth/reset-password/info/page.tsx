export default function Page() {
  return <main className="min-h-screen w-full dark:bg-darkmode-500">
    <div className="flex flex-col gap-10 items-center justify-center h-screen max-w-screen-xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
    Check your email
  </h1>
  <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
    We&apos;ve sent you an email with a link to reset your password. Please check your inbox and click on the link to reset your password.
  </p>
  </div>
  </main>;
}
