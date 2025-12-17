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
            <div className="bg-primary p-2 rounded-lg">
              <Icon name="Bot" size={24} className="text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">BotBuilder</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            {isAuthenticated ? (
              <button 
                onClick={() => onScrollToSection('dashboard')}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                Личный кабинет
              </button>
            ) : (
              <>
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
              </>
            )}
            <button 
              onClick={() => onScrollToSection('pricing')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Тарифы
            </button>
          </nav>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onScrollToSection('dashboard')}
                  className="hidden sm:flex"
                >
                  <Icon name="User" size={16} className="mr-2" />
                  Кабинет
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => auth.logout()}
                >
                  <Icon name="LogOut" size={16} className="mr-2" />
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setAuthModalTab('login');
                    setAuthModalOpen(true);
                  }}
                >
                  Войти
                </Button>
                <Button 
                  size="sm" 
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => {
                    setAuthModalTab('register');
                    setAuthModalOpen(true);
                  }}
                >
                  Начать бесплатно
                </Button>
              </>
            )}
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