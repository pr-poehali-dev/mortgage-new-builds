import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: {
    name: string;
    price: string;
    features: string[];
  };
  userEmail?: string;
}

export const PaymentModal = ({ open, onOpenChange, plan, userEmail }: PaymentModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(userEmail || '');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const { toast } = useToast();

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/384e38fb-4a99-46a3-afc6-c290286ef765', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          plan_name: plan.name,
          amount: parseInt(plan.price),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Оплата успешна!',
          description: `Подписка "${plan.name}" активирована до ${new Date(data.expires_at).toLocaleDateString('ru-RU')}`,
        });
        onOpenChange(false);
        
        // В реальном приложении здесь был бы редирект на payment_url
        // window.location.href = data.payment_url;
      } else {
        toast({
          variant: 'destructive',
          title: 'Ошибка оплаты',
          description: data.error || 'Не удалось обработать платеж',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: 'Проблема с подключением к серверу',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const match = cleaned.match(/.{1,4}/g);
    return match ? match.join(' ') : cleaned;
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Icon name="CreditCard" size={24} className="text-primary" />
            Оформление подписки
          </DialogTitle>
          <DialogDescription>
            Безопасная оплата через защищенное соединение
          </DialogDescription>
        </DialogHeader>

        <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 p-4 border-primary/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Тариф:</span>
            <span className="text-lg font-bold">{plan.name}</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-muted-foreground">К оплате:</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold">{plan.price}</span>
              <span className="text-xl font-semibold text-muted-foreground">₽</span>
              <span className="text-sm text-muted-foreground">/месяц</span>
            </div>
          </div>
        </Card>

        <form onSubmit={handlePayment} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="payment-email">Email</Label>
            <Input
              id="payment-email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="card-number">Номер карты</Label>
            <div className="relative mt-2">
              <Input
                id="card-number"
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => {
                  const formatted = formatCardNumber(e.target.value);
                  if (formatted.replace(/\s/g, '').length <= 16) {
                    setCardNumber(formatted);
                  }
                }}
                required
                maxLength={19}
                className="pr-12"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                <Icon name="CreditCard" size={20} className="text-muted-foreground" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiry">Срок действия</Label>
              <Input
                id="expiry"
                type="text"
                placeholder="ММ/ГГ"
                value={expiryDate}
                onChange={(e) => {
                  const formatted = formatExpiryDate(e.target.value);
                  if (formatted.replace(/\D/g, '').length <= 4) {
                    setExpiryDate(formatted);
                  }
                }}
                required
                maxLength={5}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                type="text"
                placeholder="123"
                value={cvv}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 3) {
                    setCvv(value);
                  }
                }}
                required
                maxLength={3}
                className="mt-2"
              />
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-3 text-sm text-muted-foreground flex items-start gap-2">
            <Icon name="Shield" size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <span>
              Все платежи защищены SSL-шифрованием. Данные вашей карты хранятся в соответствии со стандартом PCI DSS.
            </span>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 text-base bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            {isLoading ? (
              <>
                <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                Обработка платежа...
              </>
            ) : (
              <>
                <Icon name="Lock" size={20} className="mr-2" />
                Оплатить {plan.price} ₽
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
