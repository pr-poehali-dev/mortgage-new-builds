import { useState, useEffect } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { TemplatesSection } from '@/components/TemplatesSection';
import { BuilderSection } from '@/components/BuilderSection';
import { PricingSection } from '@/components/PricingSection';
import { AuthSection } from '@/components/AuthSection';
import { DashboardSection } from '@/components/DashboardSection';
import { CTASection } from '@/components/CTASection';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { auth } from '@/lib/auth';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(auth.isAuthenticated());
    const handleAuthChange = () => setIsAuthenticated(auth.isAuthenticated());
    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onScrollToSection={scrollToSection} />
      <main>
        {isAuthenticated ? (
          <>
            <DashboardSection />
            <PricingSection />
            <CTASection />
          </>
        ) : (
          <>
            <HeroSection onScrollToSection={scrollToSection} />
            <FeaturesSection />
            <BuilderSection />
            <TemplatesSection />
            <PricingSection />
            <AuthSection />
            <CTASection />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;