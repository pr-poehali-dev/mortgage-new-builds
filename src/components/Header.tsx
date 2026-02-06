import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { AuthModal } from './AuthModal';
import { auth } from '@/lib/auth';

interface HeaderProps {
  onScrollToSection: (id: string) => void;
}

export const Header = ({ onScrollToSection }: HeaderProps) => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    setIsAuthenticated(auth.isAuthenticated());
    const handleAuthChange = () => setIsAuthenticated(auth.isAuthenticated());
    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="https://cdn.poehali.dev/projects/1a7c493f-b51e-41cc-b773-168038db319d/bucket/40e6dbd5-6c34-4097-81e3-ca5017367ee1.jpg" 
              alt="Ипотечникофф" 
              className="h-12 w-auto"
            />
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => onScrollToSection('calculator')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Калькулятор
            </button>
            <button 
              onClick={() => onScrollToSection('programs')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Программы
            </button>
            <button 
              onClick={() => onScrollToSection('properties')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Новостройки
            </button>
            <button 
              onClick={() => onScrollToSection('contact')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Контакты
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <Button 
              size="sm" 
              className="bg-primary hover:bg-primary/90"
              onClick={() => onScrollToSection('contact')}
            >
              <Icon name="Phone" size={16} className="mr-2" />
              Позвонить
            </Button>
          </div>
        </div>
      </div>
      
      <AuthModal 
        open={authModalOpen} 
        onOpenChange={setAuthModalOpen}
        defaultTab={authModalTab}
      />
    </header>
  );
};