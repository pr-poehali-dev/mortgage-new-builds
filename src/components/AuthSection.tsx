import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { auth } from '@/lib/auth';

export const AuthSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [botToken, setBotToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsAuthenticated(auth.isAuthenticated());
    const handleAuthChange = () => setIsAuthenticated(auth.isAuthenticated());
    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);

  if (isAuthenticated) {
    const user = auth.getUser();
    return (
      <section id="auth" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="p-8">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={32} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Вы уже зарегистрированы!</h3>
              <p className="text-muted-foreground mb-6">
                {user?.bot ? (
                  <>Ваш бот <span className="font-mono">@{user.bot.username}</span> активен</>
                ) : (
                  <>Аккаунт: {user?.email}</>
                )}
              </p>
              <Button 
                variant="outline" 
                onClick={() => auth.logout()}
              >
                <Icon name="LogOut" size={16} className="mr-2" />
                Выйти
              </Button>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/6cd2557d-3782-4c71-98ca-444edae04c77', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          bot_token: botToken,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        auth.setUser({
          email,
          bot: data.bot
        });
        toast({
          title: 'Успешно!',
          description: data.message || 'Бот зарегистрирован!',
        });
        setEmail('');
        setBotToken('');
      } else {
        toast({
          variant: 'destructive',
          title: 'Ошибка',
          description: data.error || 'Не удалось зарегистрировать бота. Проверьте данные.',
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

  return (
    <section id="auth" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Icon name="Rocket" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Быстрый старт</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Зарегистрируйте своего бота
            </h2>
            <p className="text-xl text-muted-foreground">
              Получите токен от BotFather и начните работу прямо сейчас
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 animate-slide-up">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="UserPlus" size={24} className="text-primary" />
                Регистрация
              </h3>

              <form onSubmit={handleRegister} className="space-y-6">
                <div>
                  <Label htmlFor="email" className="text-base mb-2">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Для управления вашими ботами
                  </p>
                </div>

                <div>
                  <Label htmlFor="botToken" className="text-base mb-2">
                    Telegram Bot Token
                  </Label>
                  <Input
                    id="botToken"
                    type="text"
                    placeholder="1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"
                    value={botToken}
                    onChange={(e) => setBotToken(e.target.value)}
                    required
                    className="h-12 font-mono text-sm"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Получите у @BotFather в Telegram
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 text-base bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                >
                  {isLoading ? (
                    <>
                      <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                      Регистрация...
                    </>
                  ) : (
                    <>
                      <Icon name="Check" size={20} className="mr-2" />
                      Зарегистрировать бота
                    </>
                  )}
                </Button>
              </form>
            </Card>

            <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <Card className="p-6 bg-primary/5 border-primary/20">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="MessageCircle" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Шаг 1: Создайте бота</h4>
                    <p className="text-sm text-muted-foreground">
                      Откройте <span className="font-mono bg-background px-1 rounded">@BotFather</span> в Telegram
                      и отправьте команду <span className="font-mono bg-background px-1 rounded">/newbot</span>
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-primary/5 border-primary/20">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Key" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Шаг 2: Получите токен</h4>
                    <p className="text-sm text-muted-foreground">
                      BotFather отправит вам токен вида{' '}
                      <span className="font-mono bg-background px-1 rounded text-xs">
                        123456:ABC-DEF...
                      </span>
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-primary/5 border-primary/20">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Rocket" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Шаг 3: Запустите</h4>
                    <p className="text-sm text-muted-foreground">
                      Вставьте токен в форму слева, и ваш бот будет готов к настройке
                    </p>
                  </div>
                </div>
              </Card>

              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 border border-primary/20">
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Shield" size={16} className="text-primary" />
                  <span className="font-medium">Ваш токен в безопасности</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Мы используем шифрование для защиты данных вашего бота
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};