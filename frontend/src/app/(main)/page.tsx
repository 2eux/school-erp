import { LandingPageBackground } from "./_components/landing-page-background";
import { Navbar } from "./_components/navbar";
import { HeroSection } from "./_components/hero-section";
import { FeaturesSection } from "./_components/features-section";
import { ModulesSection } from "./_components/modules-section";
import { HowItWorksSection } from "./_components/how-it-works-section";
import { TestimonialsSection } from "./_components/testimonials-section";
import { PricingSection } from "./_components/pricing-section";
import { FaqSection } from "./_components/faq-section";
import { CtaSection } from "./_components/cta-section";
import { Footer } from "./_components/footer";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen">
      <LandingPageBackground />
      <Navbar />
      <main className="relative">
        <HeroSection />
        <FeaturesSection />
        <ModulesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
