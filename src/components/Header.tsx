import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  onScrollToSection: (id: string) => void;
}

export const Header = ({ onScrollToSection }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="Home" className="text-primary" size={28} />
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            ИпотекаДом
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <button onClick={() => onScrollToSection('hero')} className="text-foreground hover:text-primary transition-colors font-medium">
            Главная
          </button>
          <button onClick={() => onScrollToSection('calculator')} className="text-foreground hover:text-primary transition-colors font-medium">
            Калькулятор
          </button>
          <button onClick={() => onScrollToSection('programs')} className="text-foreground hover:text-primary transition-colors font-medium">
            Условия
          </button>
          <button onClick={() => onScrollToSection('properties')} className="text-foreground hover:text-primary transition-colors font-medium">
            Объекты
          </button>
          <button onClick={() => onScrollToSection('contact')} className="text-foreground hover:text-primary transition-colors font-medium">
            Контакты
          </button>
        </div>
        <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity" asChild>
          <a href="tel:+79991574764">
            <Icon name="Phone" size={16} className="mr-2" />
            Позвонить
          </a>
        </Button>
      </nav>
    </header>
  );
};