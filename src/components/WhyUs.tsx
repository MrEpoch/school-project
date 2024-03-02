
export default function WhyUs() {
  const data = [
    {
      text: "Reliablity and trust of companies",
      image: 
      <svg className="colored w-24 h-24 text-gray-800 group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11c.9 0 1.4-.5 2.2-1a33.3 33.3 0 0 0 4.5-5.8 1.5 1.5 0 0 1 2 .3 1.6 1.6 0 0 1 .4 1.3L14.7 10M7 11H4v6.5c0 .8.7 1.5 1.5 1.5v0c.8 0 1.5-.7 1.5-1.5V11Zm6.5-1h5l.5.1a1.8 1.8 0 0 1 1 1.4l-.1.9-2.1 6.4c-.3.7-.4 1.2-1.7 1.2-2.3 0-4.8-1-6.7-1.5"/>
  </svg>
    },
    {
      text: "Solutions according to your needs",
      image:<svg className="w-24 h-24 text-gray-800 group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 15h12M6 6h12m-6 12h0m-5 3h10c.6 0 1-.4 1-1V4c0-.6-.4-1-1-1H7a1 1 0 0 0-1 1v16c0 .6.4 1 1 1Z"/>
  </svg>
    },
    {
      text: "Your security and privacy foremost",
      image: 
<svg className="w-24 h-24 text-gray-800 group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.5 11.5 11 13l4-3.5M12 20A16.4 16.4 0 0 1 5 6.7L12 4l7 2.7A16.7 16.7 0 0 1 12 20Z"/>
  </svg>
      
    }
  ]
  return (
    <div className="min-h-screen justify-center items-center h-full w-full flex flex-col">
      <h1 className="text-3xl font-bold">Why Us?</h1>
      <div className="w-full py-14 sm:px-0 gap-8 sm:gap-8 flex flex-wrap justify-center">
        {data.map((item, index) => (
          <WhyUsCard
            key={index}
            text={item.text}
            ImageSvg={item.image}
          />
        ))}
      </div>
    </div>
  )
}

function WhyUsCard({ text, ImageSvg }: { text: string, ImageSvg: any }) {
  return (
    <div className="group min-h-[280px] max-h-[280px] max-w-[280px] min-w-[280px]
    rounded-lg dark:bg-darkmode-400 hover:bg-gradient-to-r dark:from-lime-500 from-lime-400
    dark:to-green-500 to-green-400 hover:text-white  bg-gray-200/60 cursor-pointer flex shadow items-center flex-col sm:p-4 p-2 justify-center gap-1 sm:gap-2">
      <h1 className="text-2xl font-semibold text-center">{text}</h1>
      {ImageSvg}
    </div>
  )
}
