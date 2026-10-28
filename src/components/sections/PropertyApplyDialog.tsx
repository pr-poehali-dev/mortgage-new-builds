import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface Props {
  propertyTitle: string;
  propertyInfo: string;
}

export const PropertyApplyDialog = ({ propertyTitle, propertyInfo }: Props) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const response = await fetch('https://functions.poehali.dev/01694c6d-e041-4cfe-9a8e-9dd518a53e40', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          message: `Интересует: ${propertyTitle}. ${propertyInfo}`,
          formType: 'contact',
        }),
      });
      if (!response.ok) throw new Error('fail');
      toast.success('Заявка отправлена! Мы скоро свяжемся с вами');
      setOpen(false);
      setName('');
      setPhone('');
    } catch {
      toast.error('Не удалось отправить заявку, попробуйте ещё раз');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Button className="w-full mt-4" onClick={() => setOpen(true)}>
        Оставить заявку
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Заявка на квартиру</DialogTitle>
            <DialogDescription>{propertyInfo}</DialogDescription>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-3">
            <Input placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} required />
            <Input type="tel" placeholder="+7 (___) ___-__-__" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            <Button type="submit" className="w-full" disabled={sending}>
              {sending ? 'Отправляем...' : 'Отправить'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
