import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { getRouteApi } from '@tanstack/react-router';

const indexRoute = getRouteApi('/');

export interface Property {
  id: number;
  title: string;
  location: string;
  city: string;
  price_from: number;
  image_url?: string;
  images?: string[];
  deadline?: string;
  rooms?: string;
}

const PropertyGallery = ({ images, title }: { images: string[]; title: string }) => {
  const [index, setIndex] = useState(0);
  const isPlan = index > 0;

  return (
    <div className={`h-48 relative overflow-hidden ${isPlan ? 'bg-white' : ''}`}>
      <img
        src={images[index]}
        alt={title}
        className={`w-full h-full ${isPlan ? 'object-contain' : 'object-cover'}`}
      />
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full border border-white/80 ${i === index ? 'bg-primary' : 'bg-black/30'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const PropertiesSection = () => {
  const loaded = indexRoute.useLoaderData().properties;
  const [properties, setProperties] = useState<Property[]>(loaded ?? []);
  const [isLoadingProperties, setIsLoadingProperties] = useState(loaded === null);

  useEffect(() => {
    if (loaded === null) fetchProperties();
  }, [loaded]);

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
          {(property.images?.length || property.image_url) && (
            <PropertyGallery
              images={property.images?.length ? property.images : [property.image_url as string]}
              title={property.title}
            />
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