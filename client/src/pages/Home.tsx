import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import STTDemo from "@/components/STTDemo";
import TTSDemo from "@/components/TTSDemo";
import APIDocumentation from "@/components/APIDocumentation";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <STTDemo />
        <TTSDemo />
        <APIDocumentation />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}