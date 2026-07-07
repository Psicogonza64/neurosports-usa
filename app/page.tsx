import { CTA } from "@/components/home/cta";
import { Footer } from "@/components/home/footer";
import { Header } from "@/components/home/header";
import { Hero } from "@/components/home/hero";
import { OurModel } from "@/components/home/our-model";
import { Research } from "@/components/home/research";
import { Technology } from "@/components/home/technology";
import { WhoWeHelp } from "@/components/home/who-we-help";

export default function Home() {
  return (
    <div className="bg-white text-zinc-950">
      <Header />
      <main>
        <Hero />
        <WhoWeHelp />
        <OurModel />
        <Technology />
        <Research />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}