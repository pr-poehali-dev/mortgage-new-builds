import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  onScrollToSection: (id: string) => void;
}

export const HeroSection = ({ onScrollToSection }: HeroSectionProps) => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-background -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 animate-fade-in">
            <Icon name="TrendingDown" size={20} />
            <span className="font-semibold">Минимальная ставка от 2%</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Ипотека всем и на все
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 animate-fade-in">
            Одобрение ипотеки от 2 часов, по 2 документам
          </p>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in">
            Полное сопровождение сделки. Все акции, скидки и беспроцентные рассрочки от застройщиков РФ у нас
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-card border-2 border-primary p-6 rounded-2xl shadow-xl animate-scale-in">
              <div className="text-4xl font-bold text-primary mb-2">2%</div>
              <div className="text-sm text-muted-foreground">Минимальная ставка</div>
            </div>
            <div className="bg-card border-2 border-primary p-6 rounded-2xl shadow-xl animate-scale-in" style={{ animationDelay: '100ms' }}>
              <div className="text-4xl font-bold text-primary mb-2">от 2 часов</div>
              <div className="text-sm text-muted-foreground">Одобрение</div>
            </div>
            <div className="bg-card border-2 border-primary p-6 rounded-2xl shadow-xl animate-scale-in" style={{ animationDelay: '200ms' }}>
              <div className="text-4xl font-bold text-primary mb-2">1372</div>
              <div className="text-sm text-muted-foreground">Новостройки в базе</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg px-8"
              onClick={() => onScrollToSection('calculator')}
            >
              Рассчитать ипотеку
              <Icon name="Calculator" size={20} className="ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8"
              onClick={() => onScrollToSection('programs')}
            >
              Программы ипотеки
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
