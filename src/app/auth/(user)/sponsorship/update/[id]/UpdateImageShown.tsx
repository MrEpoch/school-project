"use client";

import ImageComponents from "@/components/ImageComponents";
import Image from "next/image";
import { useState } from "react";

export default function ImageComponentUpdate({
  imageSrc,
}: {
  imageSrc: string;
}) {
  const [shown, setShown] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        {shown ? (
          <ImageComponents />
        ) : (
          <>
            <Image
              width={1000}
              height={750}
              className="rounded-lg w-full h-full object-cover"
              src={imageSrc}
              alt="image tp update"
            />
          </>
        )}
      </div>
      <div className="w-full flex items-center gap-3">
        <label className="block text-sm font-medium text-gray-900 dark:text-white">
          Show image
        </label>
        <input
          type="checkbox"
          checked={shown}
          onChange={() => setShown((prev) => !prev)}
        />
      </div>
    </div>
  );
}
