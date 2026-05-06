import Contact from "./_components/contact";
import CourseLevels from "./_components/courses";
import Immersion from "./_components/immersion";
import  Navbar  from "./_components/navbar";
import AboutUs from "./_components/rwe";
import  Showcase  from "./_components/showcase";
import Testimonials from "./_components/testimonials";
import { WhatsappButton } from "./_components/whatsbutton";


export default function Home() {
  return (
    <>
      <Navbar/>
      <Showcase />
      <AboutUs />
      <CourseLevels />
      <Immersion />
      <Testimonials />
      <Contact />
      <WhatsappButton />
    </>
  )
}
