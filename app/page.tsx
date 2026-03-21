import { Hero } from "@/components/sections/hero";
import { AboutSnapshot } from "@/components/sections/about-snapshot";
import { Services } from "@/components/sections/services";
import { Features } from "@/components/sections/features";
import { Projects } from "@/components/sections/projects";
import { CTA } from "@/components/sections/cta";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-zinc-50 font-sans">
      <Hero />
      <AboutSnapshot />
      <Services />
      <Features />
      <Projects />
      <CTA />
    </div>
  );
}
