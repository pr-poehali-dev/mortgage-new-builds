import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const BuilderSection = () => {
  const [botName, setBotName] = useState('');

  return (
    <section id="builder" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <Icon name="Wrench" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Попробуйте прямо сейчас</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Конструктор ботов
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Создайте своего первого бота за 5 минут с помощью визуального редактора
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="p-6 animate-slide-up">
            <Tabs defaultValue="commands" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="commands">Команды</TabsTrigger>
                <TabsTrigger value="messages">Сообщения</TabsTrigger>
                <TabsTrigger value="buttons">Кнопки</TabsTrigger>
              </TabsList>
              
              <TabsContent value="commands" className="space-y-4">
                <div className="border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name="Zap" size={20} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">/start</div>
                        <div className="text-sm text-muted-foreground">Приветственное сообщение</div>
                      </div>
                    </div>
                    <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                  </div>
                </div>

                <div className="border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name="HelpCircle" size={20} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">/help</div>
                        <div className="text-sm text-muted-foreground">Справка по командам</div>
                      </div>
                    </div>
                    <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                  </div>
                </div>

                <div className="border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name="Settings" size={20} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">/settings</div>
                        <div className="text-sm text-muted-foreground">Настройки бота</div>
                      </div>
                    </div>
                    <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить команду
                </Button>
              </TabsContent>

              <TabsContent value="messages" className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="text-sm font-medium mb-3">Текст приветствия</div>
                  <Input placeholder="Привет! Я твой новый помощник..." className="mb-3" />
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Icon name="Bold" size={14} />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Icon name="Italic" size={14} />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Icon name="Code" size={14} />
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="text-sm font-medium mb-3">Автоответы</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Input placeholder="Ключевое слово" className="flex-1" />
                      <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
                      <Input placeholder="Ответ" className="flex-1" />
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="mt-2">
                    <Icon name="Plus" size={14} className="mr-1" />
                    Добавить
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="buttons" className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="text-sm font-medium mb-3">Клавиатура бота</div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <Button variant="secondary" className="h-12">📋 Меню</Button>
                    <Button variant="secondary" className="h-12">💬 Помощь</Button>
                    <Button variant="secondary" className="h-12">⚙️ Настройки</Button>
                    <Button variant="secondary" className="h-12">📞 Контакты</Button>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Icon name="Plus" size={14} className="mr-1" />
                    Добавить кнопку
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="text-sm font-medium mb-3">Inline-кнопки</div>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      🔗 Перейти на сайт
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      📱 Подписаться на канал
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>

          <Card className="p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Предпросмотр</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">Активен</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6 mb-6">
              <div className="bg-background rounded-lg shadow-lg p-4 max-w-sm mx-auto">
                <div className="flex items-center gap-3 pb-4 border-b mb-4">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Bot" size={20} className="text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">
                      {botName || 'Мой бот'}
                    </div>
                    <div className="text-xs text-muted-foreground">онлайн</div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="bg-muted rounded-lg p-3">
                    <p className="text-sm">Привет! Я твой новый помощник 👋</p>
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <p className="text-sm">Выбери команду из меню или напиши мне!</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button size="sm" variant="secondary">📋 Меню</Button>
                  <Button size="sm" variant="secondary">💬 Помощь</Button>
                  <Button size="sm" variant="secondary">⚙️ Настройки</Button>
                  <Button size="sm" variant="secondary">📞 Контакты</Button>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-2 block">Название бота</label>
                <Input 
                  placeholder="Введите название..."
                  value={botName}
                  onChange={(e) => setBotName(e.target.value)}
                />
              </div>
              
              <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                <Icon name="Rocket" size={16} className="mr-2" />
                Запустить бота
              </Button>
              
              <Button variant="outline" className="w-full">
                <Icon name="Download" size={16} className="mr-2" />
                Экспортировать код
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
