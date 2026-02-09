import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

export default function MortgageCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(5000000);
  const [downPayment, setDownPayment] = useState(1000000);
  const [term, setTerm] = useState(20);
  const [rate, setRate] = useState(12);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const loanAmount = propertyPrice - downPayment;
  const monthlyRate = rate / 100 / 12;
  const numberOfPayments = term * 12;
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  const totalAmount = monthlyPayment * numberOfPayments;
  const overpayment = totalAmount - loanAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://functions.poehali.dev/1a7c493f-b51e-41cc-b773-168038db319d/send-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          message: email,
          formType: 'calculator',
          loanAmount: propertyPrice.toLocaleString('ru-RU'),
          initialPayment: downPayment.toLocaleString('ru-RU'),
          loanTerm: term,
          interestRate: rate,
          monthlyPayment: Math.round(monthlyPayment).toLocaleString('ru-RU'),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setName('');
        setPhone('');
        setEmail('');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="calculator" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Калькулятор ипотеки</h2>
          <p className="text-xl text-muted-foreground">Рассчитайте ежемесячный платеж и оставьте заявку</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Расчет ипотечного кредита</CardTitle>
              <CardDescription>Настройте параметры для расчета</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Стоимость недвижимости: {propertyPrice.toLocaleString('ru-RU')} ₽</Label>
                  <Slider
                    value={[propertyPrice]}
                    onValueChange={(value) => setPropertyPrice(value[0])}
                    min={1000000}
                    max={30000000}
                    step={100000}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Первоначальный взнос: {downPayment.toLocaleString('ru-RU')} ₽ ({Math.round((downPayment / propertyPrice) * 100)}%)</Label>
                  <Slider
                    value={[downPayment]}
                    onValueChange={(value) => setDownPayment(value[0])}
                    min={propertyPrice * 0.1}
                    max={propertyPrice * 0.9}
                    step={50000}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Срок кредита: {term} лет</Label>
                  <Slider
                    value={[term]}
                    onValueChange={(value) => setTerm(value[0])}
                    min={1}
                    max={30}
                    step={1}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Процентная ставка: {rate}%</Label>
                  <Slider
                    value={[rate]}
                    onValueChange={(value) => setRate(value[0])}
                    min={2}
                    max={20}
                    step={0.1}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 p-4 bg-primary/10 rounded-lg">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Сумма кредита</p>
                  <p className="text-2xl font-bold">{loanAmount.toLocaleString('ru-RU')} ₽</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Ежемесячный платеж</p>
                  <p className="text-2xl font-bold text-primary">{Math.round(monthlyPayment).toLocaleString('ru-RU')} ₽</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Переплата</p>
                  <p className="text-2xl font-bold">{Math.round(overpayment).toLocaleString('ru-RU')} ₽</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 pt-6 border-t">
                <h3 className="text-lg font-semibold">Оставить заявку</h3>
                
                <div>
                  <Label htmlFor="name">Ваше имя *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Иван Иванов"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@mail.ru"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                      Отправка...
                    </>
                  ) : (
                    <>
                      <Icon name="Send" className="mr-2 h-4 w-4" />
                      Отправить заявку
                    </>
                  )}
                </Button>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 text-green-800 rounded-lg flex items-center gap-2">
                    <Icon name="CheckCircle" className="h-5 w-5" />
                    <p>Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 text-red-800 rounded-lg flex items-center gap-2">
                    <Icon name="AlertCircle" className="h-5 w-5" />
                    <p>Ошибка отправки. Попробуйте позже или позвоните нам.</p>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}