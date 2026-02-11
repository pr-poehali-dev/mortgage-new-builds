import { HeroSection } from '@/components/HeroSection';
import { SectionsContent } from '@/components/SectionsContent';
import { CalculatorSection } from '@/components/CalculatorSection';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import MortgageCalculator from '@/components/MortgageCalculator';
import { TestimonialsSection } from '@/components/TestimonialsSection';

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
        <MortgageCalculator />
        <CalculatorSection />
        <SectionsContent />
      </main>
      <Footer />
    </div>
  );
};

export default Index;