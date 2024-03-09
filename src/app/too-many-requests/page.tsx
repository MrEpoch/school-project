
export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Too many requests
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please try again later.
        </p>
      </div>
    </div>
  )
}
