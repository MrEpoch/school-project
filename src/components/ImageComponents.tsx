"use client";
import Image from "next/image";
import { useState } from "react";

export default function ImageComponents() {
  const [image, setImage] = useState<null | FileList>(null);
  return (
    <>
      {image ? (
        <Image
          width={1000}
          height={750}
          className="rounded-lg w-full h-full object-cover"
          src={URL.createObjectURL(image[0])}
          alt=""
        />
      ) : (
        <div className="rounded-lg w-full p-4 bg-gray-50 dark:bg-darkmode-400 h-full flex items-center flex-col gap-5 justify-center">
          <svg
            className="w-10 h-10 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 20"
          >
            <path
              fill="currentColor"
              d="M11.045 7.514a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm-4.572 3.072L3.857 15.92h7.949l-1.811-3.37-1.61 2.716-1.912-4.679Z"
            />
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 1v4a1 1 0 0 1-1 1H1m14 12a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2v16ZM11.045 7.514a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM3.857 15.92l2.616-5.333 1.912 4.68 1.61-2.717 1.81 3.37H3.858Z"
            />
          </svg>
          <p>Upload your file here</p>
          <p>PNG, JPG, JPEG, WEBP allowed.</p>
        </div>
      )}
      <input
        type="file"
        required
        onChange={(e) => {
          setImage(e.target.files);
        }}
        className="absolute w-full h-full z-10 top-0 left-0 opacity-0 cursor-pointer"
        name="image"
      />
    </>
  );
}
