import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";

import Hero from "@/components/sections/Hero";
import Process from "@/components/sections/Process";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Services from "@/components/sections/Services";
import Results from "@/components/sections/Results";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <ScrollProgress />
      <Navbar />

      <main className="relative">
        <Hero />
        <Process />
        <FeaturedWork />
        <Services />
        <Results />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
