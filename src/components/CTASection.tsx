import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { AuthModal } from './AuthModal';

export const CTASection = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary via-primary/90 to-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <Icon name="Zap" size={16} className="text-white" />
            <span className="text-sm font-medium text-white">Начните прямо сейчас</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Создайте своего первого бота за 5 минут
          </h2>
          
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Без кредитной карты. Без скрытых платежей. Просто регистрируйтесь и начинайте создавать.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 h-14 shadow-2xl"
              onClick={() => setAuthModalOpen(true)}
            >
              Начать бесплатно
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 text-lg px-8 h-14"
              onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}
            >
              <Icon name="Play" size={20} className="mr-2" />
              Смотреть демо
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <Icon name="Check" size={20} className="text-white" />
              <span>Без кода</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Check" size={20} className="text-white" />
              <span>Быстрый старт</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Check" size={20} className="text-white" />
              <span>Бесплатный план</span>
            </div>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center animate-scale-in">
            <div className="text-4xl font-bold text-white mb-2">50K+</div>
            <div className="text-white/80">Активных ботов</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <div className="text-4xl font-bold text-white mb-2">98%</div>
            <div className="text-white/80">Довольных клиентов</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-4xl font-bold text-white mb-2">24/7</div>
            <div className="text-white/80">Работа без остановок</div>
          </div>
        </div>
      </div>
      
      <AuthModal 
        open={authModalOpen} 
        onOpenChange={setAuthModalOpen}
        defaultTab="register"
      />
    </section>
  );
};