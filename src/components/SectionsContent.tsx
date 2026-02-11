import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MortgagePrograms } from '@/components/sections/MortgagePrograms';
import { PropertiesSection } from '@/components/sections/PropertiesSection';
import { ContactForm } from '@/components/sections/ContactForm';

export const SectionsContent = () => {
  return (
    <div className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <Tabs defaultValue="programs" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12">
            <TabsTrigger value="programs" className="text-sm md:text-base">
              Программы
            </TabsTrigger>
            <TabsTrigger value="properties" className="text-sm md:text-base">
              Новостройки
            </TabsTrigger>
            <TabsTrigger value="contact" className="text-sm md:text-base">
              Контакты
            </TabsTrigger>
          </TabsList>

          <TabsContent value="programs" id="programs">
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-4">Ипотечные программы</h2>
                <p className="text-xl text-muted-foreground mb-12">
                  Выберите подходящую программу
                </p>
              </div>
              <MortgagePrograms />
            </div>
          </TabsContent>

          <TabsContent value="properties" id="properties">
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-4">Новостройки</h2>
                <p className="text-xl text-muted-foreground mb-12">
                  Доступные объекты недвижимости
                </p>
              </div>
              <PropertiesSection />
            </div>
          </TabsContent>

          <TabsContent value="contact" id="contact">
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-4">Связаться с нами</h2>
                <p className="text-xl text-muted-foreground mb-12">
                  Оставьте заявку и мы свяжемся с вами
                </p>
              </div>
              <ContactForm />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
