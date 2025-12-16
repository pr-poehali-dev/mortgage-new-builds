import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  onScrollToSection: (id: string) => void;
}

export const HeroSection = ({ onScrollToSection }: HeroSectionProps) => {
  return (
    <section id="hero" className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Ипотека на новостройки в Самаре{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                от 5%
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Одобрение за 24 часа. Помощь с документами. Лучшие новостройки Самары.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={() => onScrollToSection('calculator')}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-lg px-8"
              >
                Рассчитать ипотеку
                <Icon name="Calculator" size={20} className="ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8"
                asChild
              >
                <a href="https://t.me/iNexus63" target="_blank" rel="noopener noreferrer">
                  <Icon name="Send" size={20} className="mr-2" />
                  Консультация в Telegram
                </a>
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-12">
              <div>
                <div className="text-3xl font-bold text-primary mb-1">5%</div>
                <div className="text-sm text-muted-foreground">Минимальная ставка</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">24ч</div>
                <div className="text-sm text-muted-foreground">Одобрение</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">50+</div>
                <div className="text-sm text-muted-foreground">Новостроек</div>
              </div>
            </div>
          </div>
          <div className="relative animate-scale-in">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
            <img
              src="https://cdn.poehali.dev/projects/1a7c493f-b51e-41cc-b773-168038db319d/files/eabcf124-228e-4a90-8ba0-4371d7806eb6.jpg"
              alt="Счастливая семья с ключами"
              className="relative rounded-3xl shadow-2xl w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};