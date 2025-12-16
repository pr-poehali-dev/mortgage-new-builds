import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export const SectionsContent = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      
      if (data.whatsappUrl) {
        toast.success('Заявка отправлена!', {
          description: 'Мы свяжемся с вами в ближайшее время',
        });
        window.open(data.whatsappUrl, '_blank');
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
  const properties = [
    {
      title: "ЖК Волжские Паруса",
      location: "Самара, Промышленный район",
      price: "от 3 800 000 ₽",
      image: "https://cdn.poehali.dev/projects/1a7c493f-b51e-41cc-b773-168038db319d/files/dac2f64c-92dc-4821-adde-b4e02f8b3070.jpg",
      deadline: "III квартал 2025",
      rooms: "1-3 комнатные"
    },
    {
      title: "ЖК Самарский",
      location: "Самара, Советский район",
      price: "от 4 200 000 ₽",
      image: "https://cdn.poehali.dev/projects/1a7c493f-b51e-41cc-b773-168038db319d/files/dac2f64c-92dc-4821-adde-b4e02f8b3070.jpg",
      deadline: "IV квартал 2025",
      rooms: "1-2 комнатные"
    },
    {
      title: "ЖК Речной Бульвар",
      location: "Самара, Куйбышевский район",
      price: "от 3 500 000 ₽",
      image: "https://cdn.poehali.dev/projects/1a7c493f-b51e-41cc-b773-168038db319d/files/dac2f64c-92dc-4821-adde-b4e02f8b3070.jpg",
      deadline: "II квартал 2026",
      rooms: "1-3 комнатные"
    }
  ];

  const programs = [
    {
      title: "Семейная ипотека",
      rate: "от 5.7%",
      description: "Для семей с детьми, рожденными с 2018 года",
      features: ["До 12 млн в Москве", "До 6 млн в регионах", "Первый взнос от 15%"]
    },
    {
      title: "IT-ипотека",
      rate: "от 5%",
      description: "Для специалистов IT-отрасли",
      features: ["До 18 млн в Москве", "До 9 млн в регионах", "Первый взнос от 15%"]
    },
    {
      title: "Стандартная ипотека",
      rate: "от 10.5%",
      description: "Классическая программа для покупки новостройки",
      features: ["До 30 млн", "Первый взнос от 15%", "Срок до 30 лет"]
    }
  ];

  return (
    <>
      <section id="programs" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Программы ипотечного кредитования</h2>
            <p className="text-xl text-muted-foreground">Выберите подходящую программу</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
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
                  <Button className="w-full mt-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
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
              <div className="grid md:grid-cols-3 gap-6">
                {properties.map((property, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-2xl transition-all duration-300 animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="relative h-48 overflow-hidden group">
                      <img 
                        src={property.image} 
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                        {property.price}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{property.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Icon name="MapPin" size={16} />
                        {property.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name="Calendar" size={16} className="text-muted-foreground" />
                          <span>Срок сдачи: {property.deadline}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name="Home" size={16} className="text-muted-foreground" />
                          <span>{property.rooms}</span>
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                        Подробнее
                        <Icon name="ArrowRight" size={16} className="ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
                        <a href="tel:+78462345678" className="text-primary hover:underline">
                          +7 (846) 234-56-78
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
                        <a href="mailto:info@ipotekadom.ru" className="text-primary hover:underline">
                          info@ipotekadom.ru
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
                        <div className="font-semibold mb-1">Адрес</div>
                        <p className="text-muted-foreground">
                          г. Самара, ул. Московское шоссе, 18
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
                          Пн-Пт: 9:00 - 18:00<br />
                          Сб-Вс: 10:00 - 16:00
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