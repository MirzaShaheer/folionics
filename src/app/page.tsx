import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Stats } from "@/components/stats";
import { Services } from "@/components/services";
import { Work } from "@/components/work";
import { Process } from "@/components/process";
import { Toolkit } from "@/components/toolkit";
import { Pricing } from "@/components/pricing";
import { Testimonials } from "@/components/testimonials";
import { Industries } from "@/components/industries";
import { Faq } from "@/components/faq";
import { Cta } from "@/components/cta";
import { Contact } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Services />
        <Work />
        <Process />
        <Toolkit />
        <Pricing />
        <Testimonials />
        <Industries />
        <Faq />
        <Cta />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
