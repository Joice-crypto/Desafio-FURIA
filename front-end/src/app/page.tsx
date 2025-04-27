// components
import { Navbar, Footer } from "@/components";

// sections
import Hero from "./hero";
import Content from "./quiz";
import LineUP from "./lineup";
import inicio from "./inicio/page";

export default function Campaign() {
  return (
    <>
      <Navbar />
      <Hero />
      <Content />
      <LineUP />
      <Footer />
    </>
  );
}
