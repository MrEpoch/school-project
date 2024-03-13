import ErrorHandler from "@/components/ErrorHandler";
import FormWithState from "./FormWithState";

export default function Page() {
  return (
    <div className="min-h-screen dark:bg-darkmode-500 dark:text-white/90">
      <ErrorHandler />
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Create sponsorship
        </h2>
        <FormWithState />
      </div>
    </div>
  );
}
