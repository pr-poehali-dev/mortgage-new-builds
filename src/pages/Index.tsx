import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { CalculatorSection } from '@/components/CalculatorSection';
import { SectionsContent } from '@/components/SectionsContent';

const Index = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header onScrollToSection={scrollToSection} />
      <HeroSection onScrollToSection={scrollToSection} />
      <CalculatorSection />
      <SectionsContent />
    </div>
  );
};

export default Index;
