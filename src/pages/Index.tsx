import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [initialPayment, setInitialPayment] = useState(1000000);
  const [loanTerm, setLoanTerm] = useState(20);
  const [interestRate, setInterestRate] = useState(10.5);

  const calculateMortgage = () => {
    const principal = loanAmount - initialPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalPayment = monthlyPayment * numberOfPayments;
    const overpayment = totalPayment - principal;
    
    return {
      monthlyPayment: Math.round(monthlyPayment),
      totalPayment: Math.round(totalPayment),
      overpayment: Math.round(overpayment),
      principal: Math.round(principal)
    };
  };

  const result = calculateMortgage();

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

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Home" className="text-primary" size={28} />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ИпотекаДом
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection('hero')} className="text-foreground hover:text-primary transition-colors font-medium">
              Главная
            </button>
            <button onClick={() => scrollToSection('calculator')} className="text-foreground hover:text-primary transition-colors font-medium">
              Калькулятор
            </button>
            <button onClick={() => scrollToSection('programs')} className="text-foreground hover:text-primary transition-colors font-medium">
              Условия
            </button>
            <button onClick={() => scrollToSection('properties')} className="text-foreground hover:text-primary transition-colors font-medium">
              Объекты
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-foreground hover:text-primary transition-colors font-medium">
              Контакты
            </button>
          </div>
          <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
            <Icon name="Phone" size={16} className="mr-2" />
            Позвонить
          </Button>
        </nav>
      </header>

      <section id="hero" className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Ипотека на новостройки в Самаре{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  от 5%
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Одобрение за 24 часа. Помощь с документами. Лучшие новостройки Самары.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => scrollToSection('calculator')}
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-lg px-8"
                >
                  Рассчитать ипотеку
                  <Icon name="Calculator" size={20} className="ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  <Icon name="MessageCircle" size={20} className="mr-2" />
                  Консультация
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div>
                  <div className="text-3xl font-bold text-primary mb-1">5%</div>
                  <div className="text-sm text-muted-foreground">Минимальная ставка</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-1">24ч</div>
                  <div className="text-sm text-muted-foreground">Одобрение</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-1">50+</div>
                  <div className="text-sm text-muted-foreground">Новостроек</div>
                </div>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
              <img
                src="https://cdn.poehali.dev/projects/1a7c493f-b51e-41cc-b773-168038db319d/files/eabcf124-228e-4a90-8ba0-4371d7806eb6.jpg"
                alt="Счастливая семья с ключами"
                className="relative rounded-3xl shadow-2xl w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="calculator" className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl font-bold mb-4">Рассчитайте ипотеку</h2>
              <p className="text-xl text-muted-foreground">Оставьте заявку и получите персональный расчёт</p>
            </div>

            <Card className="border-0 shadow-2xl animate-scale-in">
              <CardContent className="pt-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="calc-name">Ваше имя *</Label>
                      <Input id="calc-name" placeholder="Иван Иванов" className="mt-2" required />
                    </div>
                    <div>
                      <Label htmlFor="calc-phone">Телефон *</Label>
                      <Input id="calc-phone" type="tel" placeholder="+7 (999) 123-45-67" className="mt-2" required />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="calc-email">Email</Label>
                    <Input id="calc-email" type="email" placeholder="example@mail.ru" className="mt-2" />
                  </div>

                  <div className="space-y-4 pt-4">
                    <div>
                      <div className="flex justify-between mb-4">
                        <Label className="text-base">Стоимость квартиры</Label>
                        <span className="text-lg font-semibold text-primary">
                          {loanAmount.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                      <Slider
                        value={[loanAmount]}
                        onValueChange={(value) => setLoanAmount(value[0])}
                        min={1000000}
                        max={20000000}
                        step={100000}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>1 млн ₽</span>
                        <span>20 млн ₽</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-4">
                        <Label className="text-base">Первоначальный взнос</Label>
                        <span className="text-lg font-semibold text-primary">
                          {initialPayment.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                      <Slider
                        value={[initialPayment]}
                        onValueChange={(value) => setInitialPayment(value[0])}
                        min={loanAmount * 0.15}
                        max={loanAmount * 0.8}
                        step={50000}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>15%</span>
                        <span>80%</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-4">
                        <Label className="text-base">Срок кредита</Label>
                        <span className="text-lg font-semibold text-primary">{loanTerm} лет</span>
                      </div>
                      <Slider
                        value={[loanTerm]}
                        onValueChange={(value) => setLoanTerm(value[0])}
                        min={1}
                        max={30}
                        step={1}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>1 год</span>
                        <span>30 лет</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Предварительный ежемесячный платёж</div>
                      <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {result.monthlyPayment.toLocaleString('ru-RU')} ₽
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Сумма кредита</div>
                        <div className="font-semibold">{result.principal.toLocaleString('ru-RU')} ₽</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Переплата</div>
                        <div className="font-semibold text-orange-500">{result.overpayment.toLocaleString('ru-RU')} ₽</div>
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg py-6"
                  >
                    <Icon name="Calculator" size={20} className="mr-2" />
                    Получить точный расчёт
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="programs" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Программы ипотеки</h2>
            <p className="text-xl text-muted-foreground">Выберите программу, которая подходит именно вам</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {programs.map((program, index) => (
              <Card 
                key={index} 
                className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="bg-gradient-to-br from-primary/10 to-secondary/10">
                  <CardTitle className="text-xl">{program.title}</CardTitle>
                  <div className="text-3xl font-bold text-primary mt-2">{program.rate}</div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-6">{program.description}</p>
                  <div className="space-y-3">
                    {program.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Icon name="CheckCircle2" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-6 hover:bg-primary hover:text-white transition-colors">
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="properties" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Новостройки Самары</h2>
            <p className="text-xl text-muted-foreground">Актуальные объекты в Самаре для покупки в ипотеку</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {properties.map((property, index) => (
              <Card 
                key={index} 
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {property.rooms}
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
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Стоимость</span>
                      <span className="text-lg font-bold text-primary">{property.price}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Сдача</span>
                      <span className="font-semibold">{property.deadline}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    Посмотреть объект
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl font-bold mb-4">Остались вопросы?</h2>
              <p className="text-xl text-muted-foreground">Оставьте заявку, и наши специалисты свяжутся с вами</p>
            </div>

            <Card className="border-0 shadow-2xl animate-scale-in">
              <CardContent className="pt-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Ваше имя</Label>
                      <Input id="name" placeholder="Иван Иванов" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Телефон</Label>
                      <Input id="phone" type="tel" placeholder="+7 (999) 123-45-67" className="mt-2" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="example@mail.ru" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="message">Комментарий</Label>
                    <Input id="message" placeholder="Расскажите, что вас интересует" className="mt-2" />
                  </div>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg py-6"
                  >
                    <Icon name="Send" size={20} className="mr-2" />
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <Icon name="Phone" size={28} className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Телефон</h3>
                <p className="text-muted-foreground">+7 (846) 123-45-67</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <Icon name="Mail" size={28} className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-muted-foreground">info@ipotekadom.ru</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <Icon name="MapPin" size={28} className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Адрес</h3>
                <p className="text-muted-foreground">Самара, ул. Ленинградская, 1</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Home" size={24} className="text-primary" />
                <span className="text-xl font-bold">ИпотекаДом</span>
              </div>
              <p className="text-gray-400 text-sm">
                Помогаем семьям обрести собственное жильё с 2015 года
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Программы в Самаре</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Семейная ипотека</li>
                <li>IT-ипотека</li>
                <li>Стандартная ипотека</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>О компании</li>
                <li>Условия</li>
                <li>Документы</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>+7 (846) 123-45-67</li>
                <li>info@ipotekadom.ru</li>
                <li>Самара, ул. Ленинградская, 1</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 ИпотекаДом. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;