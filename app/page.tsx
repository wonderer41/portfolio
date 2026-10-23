import { Hero } from "@/components/hero/Hero";
import { SelectedWorks } from "@/components/works/SelectedWorks";
import { Contact } from "@/components/contact/Contact";
import { PCBAnimation } from "@/components/pcb/PCBAnimation";
import { footnote } from "@/content/meta";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWorks />
      <Contact />
      <div className="footnote">
        <span>{footnote.left}</span>
        <span style={{ color: "var(--citron)" }}>{footnote.mid}</span>
        <span>{footnote.right}</span>
      </div>
      <PCBAnimation />
    </>
  );
}
