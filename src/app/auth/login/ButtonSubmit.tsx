"use client";

import { useFormStatus } from "react-dom";

export default function ButtonSubmit() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="w-full text-white bg-lime-600 hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800"
    >
      {pending ? "Submitting..." : "Login"}
    </button>
  );
}
