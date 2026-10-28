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
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface BotSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bot: {
    id: number;
    username: string;
    name: string;
  };
}

interface Command {
  id: string;
  command: string;
  description: string;
  response: string;
}

interface BotButton {
  id: string;
  text: string;
  action: 'message' | 'url' | 'command';
  value: string;
}

export const BotSettingsModal = ({ open, onOpenChange, bot }: BotSettingsModalProps) => {
  const [botName, setBotName] = useState(bot.name);
  const [welcomeMessage, setWelcomeMessage] = useState('Привет! Я твой новый помощник 👋\n\nВыбери команду из меню или напиши мне!');
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const [commands, setCommands] = useState<Command[]>([
    { id: '1', command: '/start', description: 'Приветственное сообщение', response: welcomeMessage },
    { id: '2', command: '/help', description: 'Справка по командам', response: 'Доступные команды:\n/start - начать работу\n/help - помощь\n/settings - настройки' },
    { id: '3', command: '/settings', description: 'Настройки бота', response: 'Здесь вы можете настроить параметры бота' },
  ]);

  const [buttons, setButtons] = useState<BotButton[]>([
    { id: '1', text: '📋 Меню', action: 'command', value: '/menu' },
    { id: '2', text: '💬 Помощь', action: 'command', value: '/help' },
    { id: '3', text: '⚙️ Настройки', action: 'command', value: '/settings' },
    { id: '4', text: '📞 Контакты', action: 'message', value: 'Свяжитесь с нами' },
  ]);

  const [newCommand, setNewCommand] = useState({ command: '', description: '', response: '' });
  const [newButton, setNewButton] = useState<Omit<BotButton, 'id'>>({ text: '', action: 'message', value: '' });
  const [editingCommand, setEditingCommand] = useState<Command | null>(null);
  const [editingButton, setEditingButton] = useState<BotButton | null>(null);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    
    // Имитация сохранения на сервере
    setTimeout(() => {
      toast({
        title: 'Настройки сохранены!',
        description: `Бот @${bot.username} обновлён успешно`,
      });
      setIsSaving(false);
    }, 1000);
  };

  const handleAddCommand = () => {
    if (!newCommand.command || !newCommand.description || !newCommand.response) {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: 'Заполните все поля команды',
      });
      return;
    }

    setCommands([...commands, { ...newCommand, id: Date.now().toString() }]);
    setNewCommand({ command: '', description: '', response: '' });
    toast({
      title: 'Команда добавлена',
      description: `Команда ${newCommand.command} успешно создана`,
    });
  };

  const handleDeleteCommand = (id: string) => {
    setCommands(commands.filter(cmd => cmd.id !== id));
    toast({
      title: 'Команда удалена',
      description: 'Команда успешно удалена',
    });
  };

  const handleUpdateCommand = () => {
    if (!editingCommand) return;
    
    setCommands(commands.map(cmd => cmd.id === editingCommand.id ? editingCommand : cmd));
    setEditingCommand(null);
    toast({
      title: 'Команда обновлена',
      description: 'Изменения сохранены',
    });
  };

  const handleAddButton = () => {
    if (!newButton.text || !newButton.value) {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: 'Заполните все поля кнопки',
      });
      return;
    }

    setButtons([...buttons, { ...newButton, id: Date.now().toString() }]);
    setNewButton({ text: '', action: 'message', value: '' });
    toast({
      title: 'Кнопка добавлена',
      description: `Кнопка "${newButton.text}" успешно создана`,
    });
  };

  const handleDeleteButton = (id: string) => {
    setButtons(buttons.filter(btn => btn.id !== id));
    toast({
      title: 'Кнопка удалена',
      description: 'Кнопка успешно удалена',
    });
  };

  const handleUpdateButton = () => {
    if (!editingButton) return;
    
    setButtons(buttons.map(btn => btn.id === editingButton.id ? editingButton : btn));
    setEditingButton(null);
    toast({
      title: 'Кнопка обновлена',
      description: 'Изменения сохранены',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Icon name="Settings" size={24} className="text-primary" />
            Настройки бота @{bot.username}
          </DialogTitle>
          <DialogDescription>
            Настройте команды, сообщения и кнопки вашего бота
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">Основное</TabsTrigger>
            <TabsTrigger value="commands">Команды</TabsTrigger>
            <TabsTrigger value="messages">Сообщения</TabsTrigger>
            <TabsTrigger value="buttons">Кнопки</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4 mt-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Icon name="Bot" size={20} className="text-primary" />
                Информация о боте
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="bot-name">Название бота</Label>
                  <Input
                    id="bot-name"
                    value={botName}
                    onChange={(e) => setBotName(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Username</Label>
                  <div className="mt-2 p-3 bg-muted rounded-lg flex items-center gap-2">
                    <Icon name="AtSign" size={16} className="text-muted-foreground" />
                    <span className="font-mono">{bot.username}</span>
                    <Badge variant="secondary" className="ml-auto">Не изменяется</Badge>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Icon name="Info" size={20} className="text-primary mt-0.5" />
                    <div>
                      <div className="font-medium mb-1">Как изменить username?</div>
                      <p className="text-sm text-muted-foreground">
                        Username можно изменить только через @BotFather в Telegram. 
                        Используйте команду /setusername
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="commands" className="space-y-4 mt-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Icon name="Terminal" size={20} className="text-primary" />
                Команды бота
              </h3>

              <div className="space-y-3 mb-6">
                {commands.map((cmd) => (
                  <div key={cmd.id} className="border rounded-lg p-4">
                    {editingCommand?.id === cmd.id ? (
                      <div className="space-y-3">
                        <Input
                          placeholder="Команда (например: /start)"
                          value={editingCommand.command}
                          onChange={(e) => setEditingCommand({ ...editingCommand, command: e.target.value })}
                        />
                        <Input
                          placeholder="Описание команды"
                          value={editingCommand.description}
                          onChange={(e) => setEditingCommand({ ...editingCommand, description: e.target.value })}
                        />
                        <Input
                          placeholder="Ответ бота"
                          value={editingCommand.response}
                          onChange={(e) => setEditingCommand({ ...editingCommand, response: e.target.value })}
                        />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={handleUpdateCommand}>
                            <Icon name="Check" size={14} className="mr-1" />
                            Сохранить
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => setEditingCommand(null)}>
                            Отмена
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-mono font-semibold text-primary mb-1">{cmd.command}</div>
                          <div className="text-sm text-muted-foreground mb-2">{cmd.description}</div>
                          <div className="text-sm bg-muted p-2 rounded">{cmd.response}</div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingCommand(cmd)}
                          >
                            <Icon name="Pencil" size={14} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteCommand(cmd.id)}
                          >
                            <Icon name="Trash2" size={14} />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Добавить команду</h4>
                <div className="space-y-3">
                  <Input
                    placeholder="Команда (например: /help)"
                    value={newCommand.command}
                    onChange={(e) => setNewCommand({ ...newCommand, command: e.target.value })}
                  />
                  <Input
                    placeholder="Описание команды"
                    value={newCommand.description}
                    onChange={(e) => setNewCommand({ ...newCommand, description: e.target.value })}
                  />
                  <Input
                    placeholder="Ответ бота"
                    value={newCommand.response}
                    onChange={(e) => setNewCommand({ ...newCommand, response: e.target.value })}
                  />
                  <Button onClick={handleAddCommand} className="w-full">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить команду
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-4 mt-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Icon name="MessageSquare" size={20} className="text-primary" />
                Сообщения бота
              </h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="welcome-message">Приветственное сообщение</Label>
                  <textarea
                    id="welcome-message"
                    className="w-full mt-2 min-h-[120px] p-3 rounded-lg border border-input bg-background"
                    value={welcomeMessage}
                    onChange={(e) => setWelcomeMessage(e.target.value)}
                    placeholder="Введите приветственное сообщение..."
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Это сообщение будет отправлено при команде /start
                  </p>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="font-medium mb-2 flex items-center gap-2">
                    <Icon name="Sparkles" size={16} className="text-primary" />
                    Форматирование текста
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div><span className="font-mono bg-background px-1 rounded">*текст*</span> - жирный</div>
                    <div><span className="font-mono bg-background px-1 rounded">_текст_</span> - курсив</div>
                    <div><span className="font-mono bg-background px-1 rounded">`код`</span> - моноширинный</div>
                    <div><span className="font-mono bg-background px-1 rounded">[ссылка](url)</span> - гиперссылка</div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="buttons" className="space-y-4 mt-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Icon name="MousePointerClick" size={20} className="text-primary" />
                Клавиатура бота
              </h3>

              <div className="space-y-3 mb-6">
                {buttons.map((btn) => (
                  <div key={btn.id} className="border rounded-lg p-4">
                    {editingButton?.id === btn.id ? (
                      <div className="space-y-3">
                        <Input
                          placeholder="Текст кнопки"
                          value={editingButton.text}
                          onChange={(e) => setEditingButton({ ...editingButton, text: e.target.value })}
                        />
                        <select
                          className="w-full p-2 rounded-lg border border-input bg-background"
                          value={editingButton.action}
                          onChange={(e) => setEditingButton({ ...editingButton, action: e.target.value as any })}
                        >
                          <option value="message">Отправить сообщение</option>
                          <option value="command">Выполнить команду</option>
                          <option value="url">Открыть ссылку</option>
                        </select>
                        <Input
                          placeholder={editingButton.action === 'url' ? 'https://example.com' : editingButton.action === 'command' ? '/command' : 'Текст сообщения'}
                          value={editingButton.value}
                          onChange={(e) => setEditingButton({ ...editingButton, value: e.target.value })}
                        />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={handleUpdateButton}>
                            <Icon name="Check" size={14} className="mr-1" />
                            Сохранить
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => setEditingButton(null)}>
                            Отмена
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-semibold mb-1">{btn.text}</div>
                          <div className="text-sm text-muted-foreground">
                            {btn.action === 'message' && 'Сообщение: '}
                            {btn.action === 'command' && 'Команда: '}
                            {btn.action === 'url' && 'URL: '}
                            <span className="font-mono">{btn.value}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingButton(btn)}
                          >
                            <Icon name="Pencil" size={14} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteButton(btn.id)}
                          >
                            <Icon name="Trash2" size={14} />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Добавить кнопку</h4>
                <div className="space-y-3">
                  <Input
                    placeholder="Текст кнопки (например: 📋 Меню)"
                    value={newButton.text}
                    onChange={(e) => setNewButton({ ...newButton, text: e.target.value })}
                  />
                  <select
                    className="w-full p-2 rounded-lg border border-input bg-background"
                    value={newButton.action}
                    onChange={(e) => setNewButton({ ...newButton, action: e.target.value as BotButton['action'] })}
                  >
                    <option value="message">Отправить сообщение</option>
                    <option value="command">Выполнить команду</option>
                    <option value="url">Открыть ссылку</option>
                  </select>
                  <Input
                    placeholder={newButton.action === 'url' ? 'https://example.com' : newButton.action === 'command' ? '/command' : 'Текст сообщения'}
                    value={newButton.value}
                    onChange={(e) => setNewButton({ ...newButton, value: e.target.value })}
                  />
                  <Button onClick={handleAddButton} className="w-full">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить кнопку
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Закрыть
          </Button>
          <Button onClick={handleSaveSettings} disabled={isSaving} className="bg-gradient-to-r from-primary to-secondary">
            {isSaving ? (
              <>
                <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                Сохранение...
              </>
            ) : (
              <>
                <Icon name="Save" size={16} className="mr-2" />
                Сохранить изменения
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};