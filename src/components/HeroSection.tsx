import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  onScrollToSection: (id: string) => void;
}

export const HeroSection = ({ onScrollToSection }: HeroSectionProps) => {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-background"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Icon name="Sparkles" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Без программирования</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Создайте своего
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Telegram-бота
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Визуальный конструктор для создания ботов без кода. Готовые шаблоны, простой интерфейс, мощные возможности.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={() => onScrollToSection('builder')}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-lg px-8 h-14"
              >
                Попробовать бесплатно
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 h-14"
                onClick={() => onScrollToSection('templates')}
              >
                <Icon name="Sparkles" size={20} className="mr-2" />
                Посмотреть шаблоны
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
              <div>
                <div className="text-3xl font-bold text-primary mb-1">50K+</div>
                <div className="text-sm text-muted-foreground">Созданных ботов</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">5 мин</div>
                <div className="text-sm text-muted-foreground">До запуска</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">24/7</div>
                <div className="text-sm text-muted-foreground">Работа бота</div>
              </div>
            </div>
          </div>

          <div className="relative animate-scale-in">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-card border border-border rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="Bot" size={24} className="text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Мой первый бот</div>
                  <div className="text-sm text-muted-foreground">@my_first_bot</div>
                </div>
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="User" size={16} className="text-primary-foreground" />
                  </div>
                  <div className="bg-muted rounded-lg p-3 flex-1">
                    <p className="text-sm">Привет! Как тебя зовут?</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 flex-row-reverse">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="MessageCircle" size={16} className="text-secondary-foreground" />
                  </div>
                  <div className="bg-primary/10 rounded-lg p-3 flex-1">
                    <p className="text-sm">Александр</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="User" size={16} className="text-primary-foreground" />
                  </div>
                  <div className="bg-muted rounded-lg p-3 flex-1">
                    <p className="text-sm">Приятно познакомиться, Александр! 👋</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Icon name="Users" size={14} />
                    142 пользователя
                  </span>
                  <span className="flex items-center gap-2">
                    <Icon name="MessageSquare" size={14} />
                    1.2K сообщений
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
