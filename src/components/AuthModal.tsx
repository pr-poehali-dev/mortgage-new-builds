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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { auth } from '@/lib/auth';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: 'login' | 'register';
}

export const AuthModal = ({ open, onOpenChange, defaultTab = 'register' }: AuthModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('login-email') as string;
    
    auth.setUser({ email });
    
    setTimeout(() => {
      toast({
        title: 'Вход выполнен!',
        description: `Добро пожаловать!`,
      });
      setIsLoading(false);
      onOpenChange(false);
    }, 800);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('register-email') as string;
    const name = formData.get('register-name') as string;
    
    auth.setUser({ email });
    
    setTimeout(() => {
      toast({
        title: 'Регистрация успешна!',
        description: `Добро пожаловать, ${name}!`,
      });
      setIsLoading(false);
      onOpenChange(false);
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Добро пожаловать</DialogTitle>
          <DialogDescription>
            Войдите или создайте аккаунт для начала работы
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 mt-4">
              <div>
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  name="login-email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="login-password">Пароль</Label>
                <Input
                  id="login-password"
                  name="login-password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="mt-2"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                    Вход...
                  </>
                ) : (
                  <>
                    <Icon name="LogIn" size={16} className="mr-2" />
                    Войти
                  </>
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4 mt-4">
              <div>
                <Label htmlFor="register-name">Имя</Label>
                <Input
                  id="register-name"
                  name="register-name"
                  type="text"
                  placeholder="Иван Иванов"
                  required
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  name="register-email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="register-password">Пароль</Label>
                <Input
                  id="register-password"
                  name="register-password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="mt-2"
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                    Регистрация...
                  </>
                ) : (
                  <>
                    <Icon name="UserPlus" size={16} className="mr-2" />
                    Создать аккаунт
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};