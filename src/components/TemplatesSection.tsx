import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const templates = [
  {
    icon: 'ShoppingBag',
    name: 'Интернет-магазин',
    description: 'Прием заказов, каталог товаров, корзина и оплата',
    tags: ['Коммерция', 'Платежи'],
    popular: true,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: 'Calendar',
    name: 'Запись на услуги',
    description: 'Бронирование времени, управление записями, напоминания',
    tags: ['Бизнес', 'Расписание'],
    popular: true,
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: 'Users',
    name: 'Поддержка клиентов',
    description: 'FAQ, тикет-система, переадресация операторам',
    tags: ['Поддержка', 'Чат'],
    popular: false,
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: 'GraduationCap',
    name: 'Образование',
    description: 'Курсы, тесты, домашние задания, прогресс обучения',
    tags: ['Обучение', 'Тесты'],
    popular: false,
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: 'Megaphone',
    name: 'Рассылки',
    description: 'Массовые рассылки, сегментация, аналитика открытий',
    tags: ['Маркетинг', 'Рассылка'],
    popular: true,
    color: 'from-pink-500 to-rose-500'
  },
  {
    icon: 'Gamepad2',
    name: 'Игровой бот',
    description: 'Викторины, мини-игры, рейтинги и достижения',
    tags: ['Развлечение', 'Игры'],
    popular: false,
    color: 'from-indigo-500 to-purple-500'
  }
];

export const TemplatesSection = () => {
  return (
    <section id="templates" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <Icon name="Layout" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Готовые решения</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Шаблоны ботов
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Начните с готового шаблона и адаптируйте под свои нужды
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {templates.map((template, index) => (
            <Card 
              key={index}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${template.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon name={template.icon as any} size={28} className="text-white" />
                  </div>
                  {template.popular && (
                    <Badge className="bg-gradient-to-r from-primary to-secondary text-primary-foreground border-0">
                      <Icon name="Star" size={12} className="mr-1" />
                      Популярный
                    </Badge>
                  )}
                </div>

                <h3 className="text-xl font-bold mb-2">{template.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {template.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {template.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon name="Rocket" size={16} className="mr-2" />
                  Использовать шаблон
                </Button>
              </div>

              <div className="border-t bg-muted/50 px-6 py-3 flex items-center justify-between text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Icon name="Users" size={14} />
                  {Math.floor(Math.random() * 5000) + 1000}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Clock" size={14} />
                  5-10 мин
                </span>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" className="group">
            Смотреть все шаблоны
            <Icon name="ArrowRight" size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};
