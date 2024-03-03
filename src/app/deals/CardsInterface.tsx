"use client";

import { sponsorship } from "@prisma/client";
import { useState } from "react";
import { getSponsorships } from "./SponsorshipGet";
import Card from "./SponsorshipCard";

export default function CardsInterace({
  initialData,
}: {
  initialData: sponsorship[];
}) {
  const [data, setData] = useState(initialData);
  const [skip, setSkip] = useState(10);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="w-full h-full">
      <div className="h-screen flex flex-col
        overflow-hidden justify-center justify-items-center text-center lg:py-16 sm:grid grid-cols-1 gap-x-6 gap-y-4 sm:gap-y-6
        sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-2">
        {data.map((item) => (
          <Card key={item.id} cardInfo={item} />
        ))}
      </div>
      <form
        className="flex items-center justify-center"
        action={async (_: FormData) => {
          try {
            const getSponsorshipsWithSkip = getSponsorships.bind(null, skip);
            const newData = await getSponsorshipsWithSkip();
            if (!newData.data) {
              setError(newData.error);
            } else {
              setError(null);
              setData((prev) => [...prev, ...newData.data]);
              setSkip((prev) => prev + 10);
            }
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <button
          className="bg-transparent transition duration-300 ease-in-out hover:bg-lime-500 text-lime-700 font-semibold hover:text-white py-2 px-4 border border-lime-500 hover:border-transparent rounded"
          type="submit"
        >
          Get more
        </button>
      </form>
    </div>
  );
}
