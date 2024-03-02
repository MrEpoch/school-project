import contact from "@/assets/contact.jpg";
import ContactForm from "@/components/ContactForm";

export default function Page() {
  return (
    <main className="relative min-h-screen w-full dark:bg-darkmode-500">
    <div className="custom-shape-divider-top-1709414390">
      <svg className="text-white dark:text-darkmode-500" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path fill="currentColor" d="M1200 0L0 0 598.97 114.72 1200 0z" className="shape-fill"></path>
    </svg>
</div>
      <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${contact.src})` }}>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="dark:bg-transparent px-8 bg-white w-full">

            <ContactForm />
          </div>
        </div>
      </div>
    <div className="custom-shape-divider-bottom-1709414541">
    <svg className="text-white dark:text-darkmode-500" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path fill="currentColor" d="M1200 0L0 0 598.97 114.72 1200 0z" className="shape-fill"></path>
    </svg>
</div>
    </main>
  )
}
