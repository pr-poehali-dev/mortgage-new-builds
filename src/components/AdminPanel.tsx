import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Property {
  id: number;
  title: string;
  developer?: string;
  location: string;
  city: string;
  district?: string;
  price_from: number;
  image_url?: string;
  deadline?: string;
  rooms?: string;
  description?: string;
  area_from?: number;
  area_to?: number;
  website_url?: string;
  is_active: boolean;
}

export const AdminPanel = () => {
  const [adminKey, setAdminKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [editingProperty, setEditingProperty] = useState<Partial<Property> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = 'https://functions.poehali.dev/c641307d-2265-431f-a094-af55a85709de';

  const checkAuth = () => {
    const savedKey = localStorage.getItem('admin_key');
    if (savedKey) {
      setAdminKey(savedKey);
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProperties();
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    if (adminKey.trim()) {
      localStorage.setItem('admin_key', adminKey);
      setIsAuthenticated(true);
      toast.success('Вход выполнен');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_key');
    setAdminKey('');
    setIsAuthenticated(false);
    toast.success('Выход выполнен');
  };

  const fetchProperties = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}?limit=1000`, {
        headers: {
          'X-Admin-Key': adminKey
        }
      });
      const data = await response.json();
      setProperties(data.properties || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Ошибка загрузки данных');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingProperty?.title || !editingProperty?.location || !editingProperty?.price_from) {
      toast.error('Заполните обязательные поля');
      return;
    }

    setIsLoading(true);
    try {
      const method = editingProperty.id ? 'PUT' : 'POST';
      const response = await fetch(API_URL, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Key': adminKey
        },
        body: JSON.stringify(editingProperty)
      });

      if (response.ok) {
        toast.success(editingProperty.id ? 'Объект обновлён' : 'Объект добавлен');
        setEditingProperty(null);
        fetchProperties();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Ошибка сохранения');
      }
    } catch (error) {
      console.error('Error saving property:', error);
      toast.error('Ошибка сохранения');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить объект?')) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}?id=${id}`, {
        method: 'DELETE',
        headers: {
          'X-Admin-Key': adminKey
        }
      });

      if (response.ok) {
        toast.success('Объект удалён');
        fetchProperties();
      } else {
        toast.error('Ошибка удаления');
      }
    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error('Ошибка удаления');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Lock" size={24} />
              Вход в админ-панель
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="admin-key">Ключ доступа</Label>
                <Input
                  id="admin-key"
                  type="password"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  placeholder="Введите ключ"
                />
              </div>
              <Button onClick={handleLogin} className="w-full">
                Войти
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Icon name="Building" size={32} />
            Управление новостройками
          </h1>
          <div className="flex gap-2">
            <Button onClick={() => setEditingProperty({
              title: '',
              location: '',
              city: 'Самара',
              price_from: 0,
              is_active: true
            })}>
              <Icon name="Plus" size={20} className="mr-2" />
              Добавить объект
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <Icon name="LogOut" size={20} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>

        {editingProperty && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>
                {editingProperty.id ? 'Редактирование объекта' : 'Новый объект'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Название *</Label>
                  <Input
                    value={editingProperty.title || ''}
                    onChange={(e) => setEditingProperty({ ...editingProperty, title: e.target.value })}
                    placeholder="ЖК Волжские Паруса"
                  />
                </div>
                <div>
                  <Label>Застройщик</Label>
                  <Input
                    value={editingProperty.developer || ''}
                    onChange={(e) => setEditingProperty({ ...editingProperty, developer: e.target.value })}
                    placeholder="ООО Строй"
                  />
                </div>
                <div>
                  <Label>Адрес *</Label>
                  <Input
                    value={editingProperty.location || ''}
                    onChange={(e) => setEditingProperty({ ...editingProperty, location: e.target.value })}
                    placeholder="Промышленный район"
                  />
                </div>
                <div>
                  <Label>Город *</Label>
                  <Input
                    value={editingProperty.city || 'Самара'}
                    onChange={(e) => setEditingProperty({ ...editingProperty, city: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Район</Label>
                  <Input
                    value={editingProperty.district || ''}
                    onChange={(e) => setEditingProperty({ ...editingProperty, district: e.target.value })}
                    placeholder="Промышленный"
                  />
                </div>
                <div>
                  <Label>Цена от (руб.) *</Label>
                  <Input
                    type="number"
                    value={editingProperty.price_from || ''}
                    onChange={(e) => setEditingProperty({ ...editingProperty, price_from: parseInt(e.target.value) })}
                    placeholder="3800000"
                  />
                </div>
                <div>
                  <Label>Срок сдачи</Label>
                  <Input
                    value={editingProperty.deadline || ''}
                    onChange={(e) => setEditingProperty({ ...editingProperty, deadline: e.target.value })}
                    placeholder="III квартал 2025"
                  />
                </div>
                <div>
                  <Label>Комнатность</Label>
                  <Input
                    value={editingProperty.rooms || ''}
                    onChange={(e) => setEditingProperty({ ...editingProperty, rooms: e.target.value })}
                    placeholder="1-3 комнатные"
                  />
                </div>
                <div>
                  <Label>Площадь от (м²)</Label>
                  <Input
                    type="number"
                    value={editingProperty.area_from || ''}
                    onChange={(e) => setEditingProperty({ ...editingProperty, area_from: parseFloat(e.target.value) })}
                  />
                </div>
                <div>
                  <Label>Площадь до (м²)</Label>
                  <Input
                    type="number"
                    value={editingProperty.area_to || ''}
                    onChange={(e) => setEditingProperty({ ...editingProperty, area_to: parseFloat(e.target.value) })}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>URL изображения</Label>
                  <Input
                    value={editingProperty.image_url || ''}
                    onChange={(e) => setEditingProperty({ ...editingProperty, image_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Сайт объекта</Label>
                  <Input
                    value={editingProperty.website_url || ''}
                    onChange={(e) => setEditingProperty({ ...editingProperty, website_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Описание</Label>
                  <Textarea
                    value={editingProperty.description || ''}
                    onChange={(e) => setEditingProperty({ ...editingProperty, description: e.target.value })}
                    placeholder="Описание объекта"
                    rows={3}
                  />
                </div>
                <div className="md:col-span-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editingProperty.is_active ?? true}
                    onChange={(e) => setEditingProperty({ ...editingProperty, is_active: e.target.checked })}
                    id="is-active"
                  />
                  <Label htmlFor="is-active">Активен</Label>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={handleSave} disabled={isLoading}>
                  <Icon name="Save" size={20} className="mr-2" />
                  Сохранить
                </Button>
                <Button variant="outline" onClick={() => setEditingProperty(null)}>
                  Отмена
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Объекты ({properties.length})</h2>
            <Button variant="outline" size="sm" onClick={fetchProperties} disabled={isLoading}>
              <Icon name="RefreshCw" size={16} className="mr-2" />
              Обновить
            </Button>
          </div>
          
          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">Загрузка...</div>
          ) : properties.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Icon name="Building" size={48} className="mx-auto mb-4 opacity-20" />
              <p>Нет объектов. Добавьте первый!</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {properties.map((property) => (
                <Card key={property.id}>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      {property.image_url && (
                        <img src={property.image_url} alt={property.title} className="w-32 h-32 object-cover rounded" />
                      )}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-semibold">{property.title}</h3>
                            <p className="text-sm text-muted-foreground">{property.location}, {property.city}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => setEditingProperty(property)}>
                              <Icon name="Edit" size={16} />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleDelete(property.id)}>
                              <Icon name="Trash" size={16} />
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Цена:</span>
                            <div className="font-semibold">от {property.price_from.toLocaleString('ru-RU')} ₽</div>
                          </div>
                          {property.rooms && (
                            <div>
                              <span className="text-muted-foreground">Комнаты:</span>
                              <div>{property.rooms}</div>
                            </div>
                          )}
                          {property.deadline && (
                            <div>
                              <span className="text-muted-foreground">Сдача:</span>
                              <div>{property.deadline}</div>
                            </div>
                          )}
                          <div>
                            <span className="text-muted-foreground">Статус:</span>
                            <div className={property.is_active ? 'text-green-600' : 'text-red-600'}>
                              {property.is_active ? 'Активен' : 'Неактивен'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
