import Image from "next/image";
import womanPhoto from "@/assets/woman-phone.jpg";

export default function Page() {
  return (
    <main className="flex relative min-h-screen w-full bg-white dark:bg-darkmode-500 min-h-screen flex-col items-center justify-between p-24">
    {/* There will be div containing image which will be absolute in left top as image design */}
    <div className="absolute top-0 right-0 z-[] overflow-hidden">
      <Image
        src={womanPhoto}        alt="image"
    width={1200}
    height={800}
    className="rounded-bl-3xl h-64 w-64 object-cover"
    />
  </div>
    </main>
  );
}
