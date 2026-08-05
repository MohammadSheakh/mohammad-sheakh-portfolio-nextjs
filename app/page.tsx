import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import StackCards from "@/components/StackCards";
import Carousel from "@/components/Carousel";
import Gallery from "@/components/Gallery";
import Deck from "@/components/Deck";
import Icons from "@/components/Icons";
import SkillSet from "@/components/SkillSet";
import WhatIUse from "@/components/WhatIUse";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Steps from "@/components/Steps";
import Feedback from "@/components/Feedback";
import CircleCTA from "@/components/CircleCTA";
import Circuit from "@/components/Circuit";
import Footer from "@/components/Footer";
import SectionTitleReveal from "@/components/SectionTitleReveal";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <>
      {/* Global animation and navigation helpers for the landing page. */}
      <SectionTitleReveal />
      <Nav />
      {/* Main portfolio story, work, expertise, and social-proof sections. */}
      <Hero />
      <Marquee />
      <About />
      <StackCards />
      <Carousel />
      <Gallery />
      <Deck />
      <Icons />
      <SkillSet />
      <WhatIUse />
      <Experience />
      <Testimonials />
      <Steps />
      <Feedback />
      {/* Closing contact experience and footer utilities. */}
      <CircleCTA />
      <Circuit />
      <Footer />
      <ScrollToTop />
    </>
  );
}
