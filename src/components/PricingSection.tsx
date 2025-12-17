import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { AuthModal } from './AuthModal';
import { PaymentModal } from './PaymentModal';
import { auth } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

const plans = [
  {
    name: 'Бесплатный',
    price: '0',
    period: 'навсегда',
    description: 'Для знакомства с платформой',
    features: [
      { text: '1 активный бот', included: true },
      { text: 'До 100 пользователей', included: true },
      { text: 'Базовые команды', included: true },
      { text: 'Готовые шаблоны', included: true },
      { text: 'Экспорт кода', included: false },
      { text: 'Аналитика', included: false },
      { text: 'API интеграции', included: false },
      { text: 'Техподдержка', included: false }
    ],
    highlighted: false,
    cta: 'Начать бесплатно'
  },
  {
    name: 'Стартовый',
    price: '990',
    period: 'в месяц',
    description: 'Для малого бизнеса',
    features: [
      { text: '3 активных бота', included: true },
      { text: 'До 5000 пользователей', included: true },
      { text: 'Все команды и функции', included: true },
      { text: 'Готовые шаблоны', included: true },
      { text: 'Экспорт кода', included: true },
      { text: 'Базовая аналитика', included: true },
      { text: 'API интеграции', included: true },
      { text: 'Email поддержка', included: true }
    ],
    highlighted: true,
    cta: 'Попробовать 14 дней'
  },
  {
    name: 'Бизнес',
    price: '2990',
    period: 'в месяц',
    description: 'Для растущих компаний',
    features: [
      { text: 'Неограниченно ботов', included: true },
      { text: 'Неограниченно пользователей', included: true },
      { text: 'Все команды и функции', included: true },
      { text: 'Готовые шаблоны', included: true },
      { text: 'Экспорт кода', included: true },
      { text: 'Расширенная аналитика', included: true },
      { text: 'API + Webhooks', included: true },
      { text: 'Приоритетная поддержка 24/7', included: true }
    ],
    highlighted: false,
    cta: 'Связаться с нами'
  }
];

export const PricingSection = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsAuthenticated(auth.isAuthenticated());
    const handleAuthChange = () => setIsAuthenticated(auth.isAuthenticated());
    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);

  const handlePlanClick = (plan: typeof plans[0]) => {
    if (!isAuthenticated) {
      setAuthModalOpen(true);
      return;
    }
    
    // Бесплатный тариф не требует оплаты
    if (plan.price === '0') {
      toast({
        title: 'Тариф активирован!',
        description: `Вы используете бесплатный тариф "${plan.name}"`,
      });
      return;
    }
    
    // Для платных тарифов открываем форму оплаты
    setSelectedPlan(plan);
    setPaymentModalOpen(true);
  };
  return (
    <section id="pricing" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <Icon name="DollarSign" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Прозрачные цены</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Выберите свой план
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Начните бесплатно. Масштабируйтесь по мере роста вашего бизнеса.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative overflow-hidden animate-slide-up ${
                plan.highlighted 
                  ? 'border-primary shadow-2xl scale-105 md:scale-110' 
                  : 'hover:shadow-lg'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-secondary py-2 text-center">
                  <Badge className="bg-white text-primary border-0 font-semibold">
                    <Icon name="Star" size={12} className="mr-1" />
                    Популярный
                  </Badge>
                </div>
              )}

              <div className={`p-6 ${plan.highlighted ? 'pt-12' : ''}`}>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="text-2xl font-semibold text-muted-foreground">₽</span>
                  </div>
                  <div className="text-muted-foreground text-sm">{plan.period}</div>
                </div>

                <Button 
                  className={`w-full mb-6 ${
                    plan.highlighted 
                      ? 'bg-gradient-to-r from-primary to-secondary hover:opacity-90' 
                      : ''
                  }`}
                  variant={plan.highlighted ? 'default' : 'outline'}
                  size="lg"
                  onClick={() => handlePlanClick(plan)}
                >
                  {plan.cta}
                </Button>

                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div 
                      key={featureIndex}
                      className="flex items-start gap-3"
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        feature.included 
                          ? 'bg-primary/10' 
                          : 'bg-muted'
                      }`}>
                        <Icon 
                          name={feature.included ? 'Check' : 'X'} 
                          size={12} 
                          className={feature.included ? 'text-primary' : 'text-muted-foreground'}
                        />
                      </div>
                      <span className={`text-sm ${
                        feature.included 
                          ? 'text-foreground' 
                          : 'text-muted-foreground'
                      }`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Нужно индивидуальное решение?
          </p>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => window.location.href = 'mailto:support@botbuilder.com'}
          >
            <Icon name="Mail" size={16} className="mr-2" />
            Связаться с отделом продаж
          </Button>
        </div>
      </div>
      
      <AuthModal 
        open={authModalOpen} 
        onOpenChange={setAuthModalOpen}
        defaultTab="register"
      />
      
      {selectedPlan && (
        <PaymentModal
          open={paymentModalOpen}
          onOpenChange={setPaymentModalOpen}
          plan={{
            name: selectedPlan.name,
            price: selectedPlan.price,
            features: selectedPlan.features.filter(f => f.included).map(f => f.text)
          }}
          userEmail={auth.getUser()?.email}
        />
      )}
    </section>
  );
};