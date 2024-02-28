export default function Page() {
  return (
    <main className="min-h-screen w-full dark:bg-darkmode-500 py-12">
      <div className="max-w-screen-xl flex flex-col gap-8 w-full mx-auto h-full px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Add Sponsor
        </h2>
        <div className="h-screen w-full">
          <form
            className="w-full h-full flex pt-16 flex-col"
            method="POST"
            action="/auth/add-sponsor/api"
          >
            {/* Here will be written email of company (sponsor) which will get access to give people sponsorship, they should contact serenity htmlFor verefication and approval */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="floating_email"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-lime-500 focus:outline-none focus:ring-0 focus:border-lime-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-lime-600 peer-focus:dark:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
            </div>
            <button
              type="submit"
              className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
