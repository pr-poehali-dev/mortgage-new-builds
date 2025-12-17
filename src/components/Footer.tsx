import Icon from '@/components/ui/icon';

export const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary p-2 rounded-lg">
                <Icon name="Bot" size={20} className="text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">BotBuilder</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Создавайте профессиональных Telegram-ботов без программирования
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Продукт</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#features" className="hover:text-foreground transition-colors">
                  Возможности
                </a>
              </li>
              <li>
                <a href="#builder" className="hover:text-foreground transition-colors">
                  Конструктор
                </a>
              </li>
              <li>
                <a href="#templates" className="hover:text-foreground transition-colors">
                  Шаблоны
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-foreground transition-colors">
                  Тарифы
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Компания</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  О нас
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Блог
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Контакты
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Вакансии
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Поддержка</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Документация
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Руководства
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  API
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Статус системы
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 BotBuilder. Все права защищены.
          </p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="Github" size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="Twitter" size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="Linkedin" size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="Youtube" size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
