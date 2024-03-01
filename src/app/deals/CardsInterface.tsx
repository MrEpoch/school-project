"use client";

import { sponsorship } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import { getSponsorships } from "./SponsorshipGet";
import Card from "./SponsorshipCard";

export default function CardsInterace({ initialData }: { initialData: sponsorship[] }) {
  const [data, setData] = useState(initialData);
  const [skip, setSkip] = useState(10);
  const [error, setError] = useState<string | null>(null);

  return ( 
    <div className="w-full h-full">
      <div className="grid h-screen grid-cols-2 md:grid-cols-3 gap-4">
          {data.map((item) => (
            <Card key={item.id} cardInfo={item} />
          ))}
      </div>
      <form className="flex items-center justify-center" action={async (_: FormData) => {
        try {
          const getSponsorshipsWithSkip = getSponsorships.bind(null, skip);
          const newData = await getSponsorshipsWithSkip();
          if (!newData.data) {
            setError(newData.error);
            return;
          }
          setError(null);
          setData(prev => [...prev, ...newData.data]);
          setSkip(prev => prev + 10);
        } catch (e) {
          console.log(e);
        }
      }}>
        <button className="bg-transparent transition duration-300 ease-in-out hover:bg-lime-500 text-lime-700 font-semibold hover:text-white py-2 px-4 border border-lime-500 hover:border-transparent rounded" type="submit">Get more</button>
      </form>
    </div>
  )
}
