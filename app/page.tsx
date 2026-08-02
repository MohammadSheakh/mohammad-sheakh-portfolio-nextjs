import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import StackCards from "@/components/StackCards";
import Carousel from "@/components/Carousel";
import Gallery from "@/components/Gallery";
import Deck from "@/components/Deck";
import Icons from "@/components/Icons";
import Experience from "@/components/Experience";
import Steps from "@/components/Steps";
import CircleCTA from "@/components/CircleCTA";
import Circuit from "@/components/Circuit";
import Footer from "@/components/Footer";
import SectionTitleReveal from "@/components/SectionTitleReveal";

export default function Home() {
  return (
    <>
      <SectionTitleReveal />
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <StackCards />
      <Carousel />
      <Gallery />
      <Deck />
      <Icons />
      <Experience />
      <Steps />
      <CircleCTA />
      <Circuit />
      <Footer />
    </>
  );
}
