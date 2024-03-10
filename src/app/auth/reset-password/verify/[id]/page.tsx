export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <main className="min-h-screen w-full dark:bg-darkmode-500">
      <div className="flex flex-col gap-10 items-center justify-center h-screen max-w-screen-xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Reset your password
        </h1>
        <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
          Enter your new password
        </p>
        <form
          method="POST"
          action={`/auth/api/reset-password/verify/${id}`}
          className="w-full max-w-sm mx-auto"
        >
          <div className="mb-5">
            <label
              htmlFor="new_password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              New password
            </label>
            <input
              name="password"
              type="text"
              minLength={8}
              id="new_password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-darkmode-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
              placeholder="new password"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="repeat_new_password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              New password
            </label>
            <input
              name="repeat_password"
              type="text"
              minLength={8}
              id="repeat_new_password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-darkmode-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
              placeholder="repeat password"
              required
            />
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
