import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { auth } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { BotSettingsModal } from './BotSettingsModal';

interface Subscription {
  id: number;
  plan_name: string;
  amount: number;
  order_id: string;
  status: string;
  expires_at: string | null;
  created_at: string | null;
}

export const DashboardSection = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const { toast } = useToast();
  const user = auth.getUser();

  useEffect(() => {
    if (user?.email) {
      fetchSubscriptions();
    }

    const handleSubscriptionChange = () => {
      if (user?.email) {
        fetchSubscriptions();
      }
    };

    window.addEventListener('subscription-change', handleSubscriptionChange);
    return () => window.removeEventListener('subscription-change', handleSubscriptionChange);
  }, [user?.email]);

  const fetchSubscriptions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://functions.poehali.dev/3b98ebd2-4e42-4ffa-a133-b5f09a16f6b7?email=${encodeURIComponent(user?.email || '')}`
      );
      const data = await response.json();
      
      if (response.ok) {
        setSubscriptions(data.subscriptions || []);
      } else {
        toast({
          variant: 'destructive',
          title: 'Ошибка',
          description: data.error || 'Не удалось загрузить подписки',
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

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      pending: { label: 'Ожидает оплаты', variant: 'secondary' },
      active: { label: 'Активна', variant: 'default' },
      expired: { label: 'Истекла', variant: 'destructive' },
      cancelled: { label: 'Отменена', variant: 'outline' },
    };

    const config = statusConfig[status] || { label: status, variant: 'secondary' };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const isExpired = (expiresAt: string | null) => {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const activeSub = subscriptions.find(
    (sub) => sub.status === 'active' || (sub.expires_at && !isExpired(sub.expires_at) && sub.status === 'pending')
  );

  return (
    <section id="dashboard" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-2">Личный кабинет</h2>
                <p className="text-xl text-muted-foreground">
                  Управление подписками и ботами
                </p>
              </div>
              <Button variant="outline" onClick={fetchSubscriptions} disabled={isLoading}>
                <Icon name={isLoading ? 'Loader2' : 'RefreshCw'} size={16} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Обновить
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="User" size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Аккаунт</div>
                    <div className="font-semibold truncate max-w-[200px]">{user?.email}</div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Icon name="CreditCard" size={24} className="text-secondary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Текущий тариф</div>
                    <div className="font-semibold">{activeSub?.plan_name || 'Бесплатный'}</div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <Icon name="Bot" size={24} className="text-green-500" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Активных ботов</div>
                    <div className="font-semibold">{user?.bot ? '1' : '0'}</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {user?.bot && (
            <Card className="p-6 mb-8 animate-slide-up">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <Icon name="Bot" size={24} className="text-primary" />
                  Мои боты
                </h3>
                <Button variant="outline" size="sm">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Создать нового
                </Button>
              </div>

              <div className="border rounded-lg p-4 hover:border-primary transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                      <Icon name="Bot" size={28} className="text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg">{user.bot.name}</div>
                      <div className="text-sm text-muted-foreground">@{user.bot.username}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-muted-foreground">Активен</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSettingsModalOpen(true)}
                    >
                      <Icon name="Settings" size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => toast({ title: 'Аналитика', description: 'Функция скоро будет доступна!' })}
                    >
                      <Icon name="BarChart3" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          <Card className="p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Icon name="Receipt" size={24} className="text-primary" />
              История подписок
            </h3>

            {isLoading ? (
              <div className="text-center py-12">
                <Icon name="Loader2" size={32} className="animate-spin text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Загрузка...</p>
              </div>
            ) : subscriptions.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Receipt" size={32} className="text-muted-foreground" />
                </div>
                <p className="text-lg font-semibold mb-2">Нет подписок</p>
                <p className="text-muted-foreground mb-6">
                  Вы используете бесплатный тариф
                </p>
                <Button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
                  <Icon name="Zap" size={16} className="mr-2" />
                  Выбрать тариф
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {subscriptions.map((sub) => (
                  <div
                    key={sub.id}
                    className="border rounded-lg p-4 hover:border-primary transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                          <Icon name="CreditCard" size={20} className="text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold text-lg">{sub.plan_name}</div>
                          <div className="text-sm text-muted-foreground">
                            Заказ #{sub.order_id}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{sub.amount} ₽</div>
                        <div className="text-sm text-muted-foreground">в месяц</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Icon name="Calendar" size={14} className="text-muted-foreground" />
                          <span className="text-muted-foreground">Создан:</span>
                          <span className="font-medium">{formatDate(sub.created_at)}</span>
                        </div>
                        {sub.expires_at && (
                          <div className="flex items-center gap-2">
                            <Icon name="Clock" size={14} className="text-muted-foreground" />
                            <span className="text-muted-foreground">Истекает:</span>
                            <span className={`font-medium ${isExpired(sub.expires_at) ? 'text-destructive' : ''}`}>
                              {formatDate(sub.expires_at)}
                            </span>
                          </div>
                        )}
                      </div>
                      {getStatusBadge(sub.status)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {user?.bot && (
            <BotSettingsModal
              open={settingsModalOpen}
              onOpenChange={setSettingsModalOpen}
              bot={user.bot}
            />
          )}
        </div>
      </div>
    </section>
  );
};