import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          message,
          formType: 'contact'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const data = await response.json();
      
      if (data.success) {
        toast.success('✅ Заявка успешно отправлена!', {
          description: 'Мы получили ваше сообщение и свяжемся с вами в ближайшее время. Проверьте телефон!',
          duration: 5000,
        });
        if (data.telegramUrl) {
          window.open(data.telegramUrl, '_blank');
        }
      }

      setName('');
      setPhone('');
      setMessage('');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Ошибка отправки', {
        description: 'Попробуйте позже или свяжитесь с нами по телефону',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Оставьте заявку</CardTitle>
        <CardDescription>Мы свяжемся с вами в ближайшее время</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Имя</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ваше имя"
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Телефон</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 (___) ___-__-__"
              required
            />
          </div>
          <div>
            <Label htmlFor="message">Сообщение</Label>
            <Input
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ваше сообщение"
            />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
