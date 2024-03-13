"use client";

import { useRouter, useSearchParams } from "next/navigation";

const error_kinds: any = {
  invalid_email: "Invalid email",
  invalid_password: "Invalid password",
  invalid_password_repeat: "Passwords do not match",

  already_verified: "Email is already verified",
  user_not_found: "User not found",
  unknown_error: "Unknown error",

  invalid_code: "Invalid email code",
  user_not_created: "Failed to create user",
  email_exists: "Email already exists",

  invalid_token: "Try again clicking the link in your email",
  invalid_category: "Choose a valid category",
  invalid_amount: "Enter a valid amount",
  invalid_image: "Upload a valid image",

  failed_to_delete: "Failed to delete",
  not_verified: "Email not verified",

  sponsorship_invalid_title: "Title must be at least 5 characters long",
  sponsorship_invalid_description:
    "Description must be at least 10 characters long",
  sponsorship_invalid_amount: "Amount must be at least $50",
  sponsorship_invalid_category: "Choose a valid category",
  sponsorship_invalid_expiration_date:
    "Choose a valid expiration date, max 1 year",
};

export default function ErrorHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  let error = searchParams.get("error");

  if (error && error.length > 0) {
    return (
      <div
        id="alert-2"
        className="flex p-4 fixed top-0 left-0 m-8 right-0 z-50 items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-darkmode-200 dark:text-red-400"
        role="alert"
      >
        <svg
          className="flex-shrink-0 w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <div className="ms-3 text-sm font-medium">
          {error_kinds[error] ?? "Unknown error"}
        </div>
        <button
          onClick={() => router.push("/auth/login")}
          type="button"
          className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-darkmode-200 dark:text-red-400 dark:hover:bg-darkmode-400"
          data-dismiss-target="#alert-2"
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    );
  } else return <div />;
}
