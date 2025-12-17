import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { TemplatesSection } from '@/components/TemplatesSection';
import { BuilderSection } from '@/components/BuilderSection';
import { PricingSection } from '@/components/PricingSection';
import { AuthSection } from '@/components/AuthSection';
import { CTASection } from '@/components/CTASection';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const Index = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onScrollToSection={scrollToSection} />
      <main>
        <HeroSection onScrollToSection={scrollToSection} />
        <FeaturesSection />
        <BuilderSection />
        <TemplatesSection />
        <PricingSection />
        <AuthSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;