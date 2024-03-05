import Image from "next/image";
import ThreePeople from "@/assets/three-people.jpg";
import Accordion from "./Accordion";
import OurValues from "./OurValues";

export default function Page() {
  return (
    <main className="min-h-screen w-full h-full dark:bg-darkmode-500 py-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col gap-8">
        <div className="flex lg:flex-row w-full items-center relative justify-between flex-col flex-1 gap-8 h-full">
          <div className="flex lg:w-1/3 flex-col gap-4 h-full  ">
            <h1 className="text-3xl font-bold">About us</h1>
            <p className="text-gray-600 ">
              nipsum dolor sit amet, officia excepteur ex fugiat reprehenderit
              enim labore culpa sint ad nisi Lorem pariatur mollit ex esse
              exercitation amet. Nisi anim cupidatat excepteur officia.
              Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet
              voluptate voluptate dolor minim nulla est proident. Nostrud
              officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex
              occaecat reprehenderit commodo officia dolor Lorem duis laboris
              cupidatat officia voluptate. Culpa proident adipisicing id nulla
              nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua
              reprehenderit commodo ex non excepteur duis sunt velit enim.
              Voluptate laboris sint cupidatat ullamco ut ea consectetur et est
              culpa et culpa duis.
            </p>
          </div>
          <Image
            src={ThreePeople}
            alt="Our team"
            className="lg:w-1/3 rounded h-full object-cover flex-1 flex"
            width={1400}
            height={1400}
          />
        </div>
        <Accordion />
        <OurValues />
      </div>
    </main>
  );
}
