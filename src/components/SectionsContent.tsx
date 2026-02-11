import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Property {
  id: number;
  title: string;
  location: string;
  city: string;
  price_from: number;
  image_url?: string;
  deadline?: string;
  rooms?: string;
}

export const SectionsContent = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoadingProperties, setIsLoadingProperties] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://functions.poehali.dev/01694c6d-e041-4cfe-9a8e-9dd518a53e40', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          message,
          formType: 'contact'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const data = await response.json();
      
      if (data.success) {
        toast.success('✅ Заявка успешно отправлена!', {
          description: 'Мы получили ваше сообщение и свяжемся с вами в ближайшее время. Проверьте телефон!',
          duration: 5000,
        });
        if (data.telegramUrl) {
          window.open(data.telegramUrl, '_blank');
        }
      }

      setName('');
      setPhone('');
      setMessage('');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Ошибка отправки', {
        description: 'Попробуйте позже или свяжитесь с нами по телефону',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setIsLoadingProperties(true);
    try {
      const response = await fetch('https://functions.poehali.dev/c641307d-2265-431f-a094-af55a85709de?limit=100&is_active=true');
      const data = await response.json();
      setProperties(data.properties || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setIsLoadingProperties(false);
    }
  };

  const [selectedProgram, setSelectedProgram] = useState<number | null>(null);

  const programs = [
    {
      title: "Семейная ипотека",
      rate: "от 2%",
      description: "Для семей с детьми",
      features: ["ПВ от 0,1% до 20%", "Одобрение от 2 часов", "По 2 документам"],
      detailedDescription: "Семейная ипотека — это специальная льготная программа для семей, в которых с 2018 года родился второй или последующий ребёнок. Программа позволяет купить квартиру в новостройке по ставке от 2% годовых на весь срок кредита.",
      conditions: [
        "Ставка: от 2% годовых",
        "Первоначальный взнос: от 0,1% до 20%",
        "Срок кредита: до 30 лет",
        "Максимальная сумма: до 12 млн ₽ (Москва, МО, СПб, ЛО), до 6 млн ₽ (другие регионы)",
        "Требования: наличие второго или последующего ребёнка, рождённого с 2018 года",
        "Одобрение: от 2 часов",
        "Документы: паспорт, справка о доходах или выписка по счёту"
      ]
    },
    {
      title: "IT-ипотека",
      rate: "от 3,5%",
      description: "Для специалистов IT-отрасли",
      features: ["ПВ от 0,1% до 20%", "Одобрение от 2 часов", "По 2 документам"],
      detailedDescription: "IT-ипотека — льготная программа для работников аккредитованных IT-компаний. Позволяет купить квартиру или дом по низкой ставке от 3,5% годовых.",
      conditions: [
        "Ставка: от 3,5% годовых",
        "Первоначальный взнос: от 0,1% до 20%",
        "Срок кредита: до 30 лет",
        "Максимальная сумма: до 18 млн ₽",
        "Требования: работа в аккредитованной IT-компании не менее 3 месяцев",
        "Объект: новостройка или готовое жильё",
        "Одобрение: от 2 часов",
        "Документы: паспорт, справка с работы"
      ]
    },
    {
      title: "Беспроцентная рассрочка",
      rate: "0%",
      description: "От застройщика",
      features: ["Без переплаты", "Гибкие условия", "Одобрение от 2 часов"],
      detailedDescription: "Беспроцентная рассрочка от застройщика — это уникальная возможность купить квартиру в новостройке без переплаты по процентам. Вы платите только стоимость квартиры равными частями на протяжении срока рассрочки.",
      conditions: [
        "Ставка: 0% — без процентов",
        "Первоначальный взнос: от 10% до 50% (зависит от застройщика)",
        "Срок рассрочки: от 6 месяцев до 3 лет",
        "Платежи: равными частями ежемесячно",
        "Требования: первоначальный взнос и документы, подтверждающие платёжеспособность",
        "Объект: только новостройки от застройщика",
        "Одобрение: от 2 часов",
        "Документы: паспорт, справка о доходах (для некоторых застройщиков)"
      ]
    },
    {
      title: "Ипотека на Коммерцию",
      rate: "от 17%",
      description: "Нежилые помещения",
      features: ["ПВ от 0,1% до 10%", "Быстрое одобрение", "Полное сопровождение"],
      detailedDescription: "Коммерческая ипотека — это кредит на покупку нежилых помещений для бизнеса: офисов, торговых площадей, складов, гаражей и других объектов коммерческой недвижимости.",
      conditions: [
        "Ставка: от 17% годовых",
        "Первоначальный взнос: от 0,1% до 10%",
        "Срок кредита: до 20 лет",
        "Максимальная сумма: до 50 млн ₽",
        "Требования: подтверждение дохода, бизнес-план (для некоторых банков)",
        "Объект: офисы, магазины, склады, гаражи, апартаменты",
        "Одобрение: от 3 дней",
        "Документы: паспорт, справка о доходах, выписка по счетам"
      ]
    },
    {
      title: "Стандартная",
      rate: "от 17%",
      description: "Классическая программа",
      features: ["ПВ от 0,1% до 10%", "Срок до 30 лет", "Одобрение от 2 часов"],
      detailedDescription: "Стандартная ипотека — классическая программа кредитования для покупки жилья без специальных льгот. Подходит для всех категорий заёмщиков.",
      conditions: [
        "Ставка: от 17% годовых",
        "Первоначальный взнос: от 0,1% до 10%",
        "Срок кредита: до 30 лет",
        "Максимальная сумма: без ограничений (по платёжеспособности)",
        "Требования: возраст от 21 года, стаж работы от 3 месяцев",
        "Объект: новостройка или вторичка",
        "Одобрение: от 2 часов",
        "Документы: паспорт, справка о доходах или выписка по счёту"
      ]
    },
    {
      title: "Сельская ипотека",
      rate: "от 3%",
      description: "Для покупки жилья в сельской местности",
      features: ["ПВ от 10% до 30%", "Льготные условия", "Полное сопровождение"],
      detailedDescription: "Сельская ипотека — льготная программа для покупки или строительства жилья на сельских территориях или в малых городах с населением до 30 тысяч человек.",
      conditions: [
        "Ставка: от 3% годовых",
        "Первоначальный взнос: от 10% до 30%",
        "Срок кредита: до 25 лет",
        "Максимальная сумма: до 6 млн ₽",
        "Требования: покупка жилья в сельской местности или малом городе",
        "Объект: готовый дом, строящееся жильё, земельный участок с домом",
        "Одобрение: от 2 часов",
        "Документы: паспорт, справка о доходах"
      ]
    },
    {
      title: "Участникам СВО",
      rate: "от 2%",
      description: "Специальные условия",
      features: ["Минимальный ПВ", "Льготная ставка", "Ускоренное одобрение"],
      detailedDescription: "Специальная льготная ипотека для участников СВО и их семей. Программа предоставляет максимально выгодные условия кредитования с минимальной ставкой и первоначальным взносом.",
      conditions: [
        "Ставка: от 2% годовых",
        "Первоначальный взнос: от 0,1%",
        "Срок кредита: до 30 лет",
        "Максимальная сумма: до 12 млн ₽",
        "Требования: статус участника СВО или члена семьи",
        "Объект: новостройка или вторичка",
        "Одобрение: от 1 часа",
        "Документы: паспорт, документы, подтверждающие статус участника СВО"
      ]
    }
  ];

  return (
    <>
      <Dialog open={selectedProgram !== null} onOpenChange={(open) => !open && setSelectedProgram(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedProgram !== null && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center justify-between">
                  {programs[selectedProgram].title}
                  <span className="text-primary">{programs[selectedProgram].rate}</span>
                </DialogTitle>
                <DialogDescription className="text-base">
                  {programs[selectedProgram].description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 pt-4">
                <div>
                  <p className="text-muted-foreground leading-relaxed">
                    {programs[selectedProgram].detailedDescription}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">Условия программы:</h4>
                  <ul className="space-y-2">
                    {programs[selectedProgram].conditions.map((condition, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Icon name="CheckCircle2" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{condition}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t">
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                    onClick={() => {
                      setSelectedProgram(null);
                      const calcSection = document.getElementById('calculator');
                      calcSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Подать заявку
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <section id="programs" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Программы ипотечного кредитования</h2>
            <p className="text-xl text-muted-foreground">Выберите подходящую программу</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {programs.map((program, index) => (
              <Card key={index} className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-2xl">{program.title}</CardTitle>
                    <div className="text-2xl font-bold text-primary">{program.rate}</div>
                  </div>
                  <CardDescription className="text-base">{program.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Icon name="CheckCircle2" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full mt-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                    onClick={() => setSelectedProgram(index)}
                  >
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="properties" className="py-20 bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Новостройки в Самаре</h2>
            <p className="text-xl text-muted-foreground">Выберите квартиру своей мечты</p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-8">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="1room">1-комн</TabsTrigger>
              <TabsTrigger value="2room">2-комн</TabsTrigger>
              <TabsTrigger value="3room">3-комн</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {isLoadingProperties ? (
                <div className="text-center py-12 text-muted-foreground">Загрузка...</div>
              ) : properties.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">Новостройки скоро появятся</div>
              ) : (
                <div className="grid md:grid-cols-3 gap-6">
                  {properties.map((property, index) => (
                    <Card key={property.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="relative h-48 overflow-hidden group">
                        <img 
                          src={property.image_url || 'https://cdn.poehali.dev/projects/1a7c493f-b51e-41cc-b773-168038db319d/files/dac2f64c-92dc-4821-adde-b4e02f8b3070.jpg'} 
                          alt={property.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                          от {property.price_from.toLocaleString('ru-RU')} ₽
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl">{property.title}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <Icon name="MapPin" size={16} />
                          {property.location}, {property.city}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 mb-4">
                          {property.deadline && (
                            <div className="flex items-center gap-2 text-sm">
                              <Icon name="Calendar" size={16} className="text-muted-foreground" />
                              <span>Срок сдачи: {property.deadline}</span>
                            </div>
                          )}
                          {property.rooms && (
                            <div className="flex items-center gap-2 text-sm">
                              <Icon name="Home" size={16} className="text-muted-foreground" />
                              <span>{property.rooms}</span>
                            </div>
                          )}
                        </div>
                        <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                          Подробнее
                          <Icon name="ArrowRight" size={16} className="ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {['1room', '2room', '3room'].map((tab) => (
              <TabsContent key={tab} value={tab}>
                <div className="text-center py-12 text-muted-foreground">
                  Объекты в этой категории появятся в ближайшее время
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl font-bold mb-4">Свяжитесь с нами</h2>
              <p className="text-xl text-muted-foreground">Ответим на все ваши вопросы</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Оставьте заявку</CardTitle>
                  <CardDescription>Мы перезвоним в течение 15 минут</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <Label htmlFor="contact-name">Имя *</Label>
                      <Input 
                        id="contact-name" 
                        placeholder="Ваше имя" 
                        required 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-phone">Телефон *</Label>
                      <Input 
                        id="contact-phone" 
                        type="tel" 
                        placeholder="+7 (___) ___-__-__" 
                        required 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-message">Сообщение</Label>
                      <textarea 
                        id="contact-message"
                        className="w-full min-h-[100px] px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Расскажите о ваших пожеланиях"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Отправка...' : 'Отправить'}
                      {!isSubmitting && <Icon name="Send" size={16} className="ml-2" />}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="border-0 shadow-xl">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Icon name="Phone" size={24} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold mb-1">Телефон</div>
                        <a href="tel:+79028022220" className="text-primary hover:underline">
                          +7 (902) 802-22-20
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Icon name="Mail" size={24} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold mb-1">Email</div>
                        <a href="mailto:ipt-163@bk.ru" className="text-primary hover:underline">
                          ipt-163@bk.ru
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Icon name="MapPin" size={24} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold mb-1">Адреса</div>
                        <p className="text-muted-foreground text-sm">
                          г. Самара, ул. 22 Партсъезда, д. 173а, оф. 11<br />
                          г. Москва, ул. Новодмитровская, д. 2к2
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Icon name="Clock" size={24} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold mb-1">Режим работы</div>
                        <p className="text-muted-foreground">
                          Пн-Сб: 9:00 - 20:00<br />
                          Воскресенье: выходной
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Home" size={24} />
                <span className="text-xl font-bold">ИпотекаДом</span>
              </div>
              <p className="text-gray-400 text-sm">
                Ваш надёжный партнёр в получении ипотеки на новостройки в Самаре
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Услуги</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Ипотека на новостройки</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Рефинансирование</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Консультация</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Подбор недвижимости</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Информация</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">О компании</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Партнёры</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Отзывы</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>+7 (846) 234-56-78</li>
                <li>info@ipotekadom.ru</li>
                <li>г. Самара, ул. Московское шоссе, 18</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 ИпотекаДом. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </>
  );
};