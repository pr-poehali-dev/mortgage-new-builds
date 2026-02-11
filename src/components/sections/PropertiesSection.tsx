import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export interface Property {
  id: number;
  title: string;
  location: string;
  city: string;
  price_from: number;
  image_url?: string;
  deadline?: string;
  rooms?: string;
}

export const PropertiesSection = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoadingProperties, setIsLoadingProperties] = useState(true);

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

  if (isLoadingProperties) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground text-lg">Нет доступных объектов</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <Card key={property.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
          {property.image_url && (
            <div className="h-48 overflow-hidden">
              <img
                src={property.image_url}
                alt={property.title}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
          )}
          <CardHeader>
            <CardTitle className="text-lg">{property.title}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <Icon name="MapPin" size={16} />
              {property.city}, {property.location}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Цена от:</span>
                <span className="text-xl font-bold text-primary">
                  {property.price_from.toLocaleString('ru-RU')} ₽
                </span>
              </div>
              {property.deadline && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Срок сдачи:</span>
                  <span className="text-sm font-semibold">{property.deadline}</span>
                </div>
              )}
              {property.rooms && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Комнат:</span>
                  <span className="text-sm font-semibold">{property.rooms}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
