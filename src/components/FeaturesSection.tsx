import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const features = [
  {
    icon: 'Blocks',
    title: 'Drag & Drop редактор',
    description: 'Визуальный конструктор для создания логики бота без единой строки кода'
  },
  {
    icon: 'Zap',
    title: 'Готовые команды',
    description: 'Библиотека готовых команд и сценариев для быстрого старта'
  },
  {
    icon: 'MessageSquare',
    title: 'Умные ответы',
    description: 'Настройка автоматических ответов и сценариев общения'
  },
  {
    icon: 'Database',
    title: 'База данных',
    description: 'Встроенное хранилище для пользователей и данных бота'
  },
  {
    icon: 'BarChart3',
    title: 'Аналитика',
    description: 'Подробная статистика использования и поведения пользователей'
  },
  {
    icon: 'Webhook',
    title: 'API интеграции',
    description: 'Подключение к внешним сервисам и платежным системам'
  },
  {
    icon: 'Globe',
    title: 'Мультиязычность',
    description: 'Поддержка нескольких языков в одном боте'
  },
  {
    icon: 'Shield',
    title: 'Безопасность',
    description: 'Защита данных и модерация контента из коробки'
  }
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <Icon name="Sparkles" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Всё что нужно</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Мощные возможности
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Все инструменты для создания профессиональных ботов в одном месте
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4">
                <Icon name={feature.icon as any} size={24} className="text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl p-8 md:p-12 text-center animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Code" size={24} className="text-primary" />
            <h3 className="text-2xl md:text-3xl font-bold">Экспорт кода</h3>
          </div>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Создайте бота визуально и получите готовый код на Python или Node.js. 
            Разворачивайте где угодно: на своём сервере, в облаке или используйте наш хостинг.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <div className="px-4 py-2 bg-background rounded-lg border">
              <span className="font-mono text-sm">Python</span>
            </div>
            <div className="px-4 py-2 bg-background rounded-lg border">
              <span className="font-mono text-sm">Node.js</span>
            </div>
            <div className="px-4 py-2 bg-background rounded-lg border">
              <span className="font-mono text-sm">Docker</span>
            </div>
            <div className="px-4 py-2 bg-background rounded-lg border">
              <span className="font-mono text-sm">Webhook</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
