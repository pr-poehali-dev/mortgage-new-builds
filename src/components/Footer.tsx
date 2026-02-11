import Icon from '@/components/ui/icon';

export const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary p-2 rounded-lg">
                <Icon name="Home" size={20} className="text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">Ипотечникофф</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Ваш надёжный партнёр в получении ипотеки на новостройки в Самаре
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Услуги</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#programs" className="hover:text-foreground transition-colors">
                  Ипотека на новостройки
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Рефинансирование
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Консультация
                </a>
              </li>
              <li>
                <a href="#properties" className="hover:text-foreground transition-colors">
                  Подбор недвижимости
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Информация</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  О компании
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Партнёры
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Отзывы
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-foreground transition-colors">
                  Контакты
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="tel:+79028022220" className="hover:text-foreground transition-colors">
                  +7 (902) 802-22-20
                </a>
              </li>
              <li>
                <a href="mailto:ipt-163@bk.ru" className="hover:text-foreground transition-colors">
                  ipt-163@bk.ru
                </a>
              </li>
              <li className="pt-1 text-xs">
                г. Самара, 22 Партсъезда, 173а, оф. 11<br />
                г. Москва, Новодмитровская, 2к2
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Ипотечникофф. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};