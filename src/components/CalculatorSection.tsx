import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

export const CalculatorSection = () => {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [initialPayment, setInitialPayment] = useState(1000000);
  const [loanTerm, setLoanTerm] = useState(20);
  const [interestRate, setInterestRate] = useState(10.5);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateMortgage = () => {
    const principal = loanAmount - initialPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalPayment = monthlyPayment * numberOfPayments;
    const overpayment = totalPayment - principal;
    
    return {
      monthlyPayment: Math.round(monthlyPayment),
      totalPayment: Math.round(totalPayment),
      overpayment: Math.round(overpayment),
      principal: Math.round(principal)
    };
  };

  const result = calculateMortgage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://functions.poehali.dev/01694c6d-e041-4cfe-9a8e-9dd518a53e40', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          formType: 'calculator',
          loanAmount: loanAmount.toLocaleString('ru-RU'),
          initialPayment: initialPayment.toLocaleString('ru-RU'),
          loanTerm,
          interestRate,
          monthlyPayment: result.monthlyPayment.toLocaleString('ru-RU')
        }),
      });

      const data = await response.json();
      if (data.success && data.whatsappUrl) {
        window.open(data.whatsappUrl, '_blank');
      }
    } catch (error) {
      console.error('Ошибка отправки:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="calculator" className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Рассчитайте ипотеку</h2>
            <p className="text-xl text-muted-foreground">Оставьте заявку и получите персональный расчёт</p>
          </div>

          <Card className="border-0 shadow-2xl animate-scale-in">
            <CardContent className="pt-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="calc-name">Ваше имя *</Label>
                    <Input 
                      id="calc-name" 
                      placeholder="Иван Иванов" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="calc-phone">Телефон *</Label>
                    <Input 
                      id="calc-phone" 
                      type="tel" 
                      placeholder="+7 (___) ___-__-__" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-6 pt-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label>Стоимость недвижимости</Label>
                      <span className="text-lg font-semibold text-primary">
                        {loanAmount.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                    <Slider
                      value={[loanAmount]}
                      onValueChange={(v) => setLoanAmount(v[0])}
                      min={1000000}
                      max={30000000}
                      step={100000}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1 млн ₽</span>
                      <span>30 млн ₽</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label>Первоначальный взнос</Label>
                      <span className="text-lg font-semibold text-primary">
                        {initialPayment.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                    <Slider
                      value={[initialPayment]}
                      onValueChange={(v) => setInitialPayment(v[0])}
                      min={0}
                      max={loanAmount}
                      step={50000}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0 ₽</span>
                      <span>{Math.round((initialPayment / loanAmount) * 100)}%</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label>Срок кредита</Label>
                      <span className="text-lg font-semibold text-primary">{loanTerm} лет</span>
                    </div>
                    <Slider
                      value={[loanTerm]}
                      onValueChange={(v) => setLoanTerm(v[0])}
                      min={1}
                      max={30}
                      step={1}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1 год</span>
                      <span>30 лет</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label>Процентная ставка</Label>
                      <span className="text-lg font-semibold text-primary">{interestRate}%</span>
                    </div>
                    <Slider
                      value={[interestRate]}
                      onValueChange={(v) => setInterestRate(v[0])}
                      min={5}
                      max={20}
                      step={0.1}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>5%</span>
                      <span>20%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t">
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Ежемесячный платёж</div>
                    <div className="text-xl font-bold text-primary">
                      {result.monthlyPayment.toLocaleString('ru-RU')} ₽
                    </div>
                  </div>
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Сумма кредита</div>
                    <div className="text-xl font-bold">
                      {result.principal.toLocaleString('ru-RU')} ₽
                    </div>
                  </div>
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Переплата</div>
                    <div className="text-xl font-bold">
                      {result.overpayment.toLocaleString('ru-RU')} ₽
                    </div>
                  </div>
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Общая сумма</div>
                    <div className="text-xl font-bold">
                      {result.totalPayment.toLocaleString('ru-RU')} ₽
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-lg"
                >
                  {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                  <Icon name="Send" size={20} className="ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};