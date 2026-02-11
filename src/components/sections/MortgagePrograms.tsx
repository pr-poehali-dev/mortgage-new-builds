import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface Program {
  title: string;
  rate: string;
  description: string;
  features: string[];
  detailedDescription: string;
  conditions: string[];
}

export const programs: Program[] = [
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

export const MortgagePrograms = () => {
  const [selectedProgram, setSelectedProgram] = useState<number | null>(null);

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program, index) => (
          <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-xl">{program.title}</CardTitle>
                <span className="text-2xl font-bold text-primary">{program.rate}</span>
              </div>
              <CardDescription>{program.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-4">
                {program.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => setSelectedProgram(index)}
                className="w-full"
                variant="outline"
              >
                Подробнее
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={selectedProgram !== null} onOpenChange={() => setSelectedProgram(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedProgram !== null && programs[selectedProgram].title}</DialogTitle>
            <DialogDescription className="text-lg">
              {selectedProgram !== null && programs[selectedProgram].detailedDescription}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-3 text-lg">Условия программы:</h4>
              <ul className="space-y-2">
                {selectedProgram !== null && programs[selectedProgram].conditions.map((condition, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Icon name="ArrowRight" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <span>{condition}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
