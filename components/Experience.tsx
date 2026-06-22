"use client";

import { useState, useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

import { DirectorsCutProvider } from "@/components/cinematic/DirectorsCut";
import CinematicOverlays from "@/components/cinematic/CinematicOverlays";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import Splash from "@/components/sections/Splash";
import VideoIntro from "@/components/sections/VideoIntro";
import Hero from "@/components/sections/Hero";
import BrandStory from "@/components/sections/BrandStory";
import ServicesReveal from "@/components/sections/ServicesReveal";
import ImageStack from "@/components/sections/ImageStack";
import VideoWall from "@/components/sections/VideoWall";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import CaseStudyScroll from "@/components/sections/CaseStudyScroll";
import BeforeAfter from "@/components/sections/BeforeAfter";
import Results from "@/components/sections/Results";
import TestimonialReel from "@/components/sections/TestimonialReel";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Experience() {
  const [entered, setEntered] = useState(false);

  // Lock the page while the splash is up.
  useEffect(() => {
    if (!entered) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      window.scrollTo(0, 0);
      // Let the DOM settle, then recalc pinned/scrubbed triggers.
      const t = setTimeout(() => ScrollTrigger.refresh(), 250);
      return () => clearTimeout(t);
    }
  }, [entered]);

  return (
    <DirectorsCutProvider>
      <Cursor />

      {!entered && <Splash onEnter={() => setEntered(true)} />}

      {entered && (
        <>
          <SmoothScroll />
          <ScrollProgress />
          <CinematicOverlays />
          <Navbar />

          <main className="relative">
            <VideoIntro />
            <Hero />
            <BrandStory />
            <ServicesReveal />
            <ImageStack />
            <VideoWall />
            <ProcessTimeline />
            <CaseStudyScroll />
            <BeforeAfter />
            <Results />
            <TestimonialReel />
            <FinalCTA />
          </main>

          <Footer />
        </>
      )}
    </DirectorsCutProvider>
  );
}
