import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  onScrollToSection: (id: string) => void;
}

export const Header = ({ onScrollToSection }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg">
              <Icon name="Bot" size={24} className="text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">BotBuilder</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => onScrollToSection('features')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Возможности
            </button>
            <button 
              onClick={() => onScrollToSection('builder')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Конструктор
            </button>
            <button 
              onClick={() => onScrollToSection('templates')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Шаблоны
            </button>
            <button 
              onClick={() => onScrollToSection('pricing')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Тарифы
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Войти
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Начать бесплатно
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
