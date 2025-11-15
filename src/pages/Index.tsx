import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface KitchenItem {
  id: string;
  type: 'cabinet' | 'countertop' | 'appliance' | 'wall';
  x: number;
  y: number;
  width: number;
  height: number;
  depth: number;
  color: string;
  name: string;
  price: number;
}

const Index = () => {
  const [roomWidth, setRoomWidth] = useState([400]);
  const [roomDepth, setRoomDepth] = useState([300]);
  const [items, setItems] = useState<KitchenItem[]>([
    { id: '1', type: 'cabinet', x: 20, y: 20, width: 80, height: 90, depth: 60, color: '#8B7355', name: 'Нижний шкаф', price: 15000 },
    { id: '2', type: 'countertop', x: 20, y: 10, width: 80, height: 10, depth: 60, color: '#E5E5E5', name: 'Столешница', price: 8000 },
    { id: '3', type: 'appliance', x: 120, y: 20, width: 60, height: 90, depth: 60, color: '#C0C0C0', name: 'Холодильник', price: 45000 },
  ]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [viewAngle, setViewAngle] = useState(45);

  const cabinetTypes = [
    { id: 'lower', name: 'Нижний шкаф', price: 15000, width: 80, height: 90, depth: 60, color: '#8B7355' },
    { id: 'upper', name: 'Верхний шкаф', price: 12000, width: 80, height: 70, depth: 35, color: '#A0826D' },
    { id: 'corner', name: 'Угловой шкаф', price: 18000, width: 90, height: 90, depth: 90, color: '#8B7355' },
  ];

  const appliances = [
    { id: 'fridge', name: 'Холодильник', price: 45000, width: 60, height: 200, depth: 60, color: '#C0C0C0' },
    { id: 'oven', name: 'Духовка', price: 35000, width: 60, height: 60, depth: 55, color: '#2C2C2C' },
    { id: 'dishwasher', name: 'Посудомойка', price: 40000, width: 60, height: 85, depth: 60, color: '#D3D3D3' },
  ];

  const materials = [
    { id: 'wood', name: 'Дерево', color: '#8B7355' },
    { id: 'white', name: 'Белый', color: '#FFFFFF' },
    { id: 'gray', name: 'Серый', color: '#808080' },
    { id: 'black', name: 'Черный', color: '#2C2C2C' },
  ];

  const templates = [
    { id: 't1', name: 'Минимал', description: 'Простая L-образная кухня', cost: 180000 },
    { id: 't2', name: 'Студия', description: 'Компактная для студии', cost: 120000 },
    { id: 't3', name: 'Премиум', description: 'Большая П-образная', cost: 350000 },
  ];

  const addItem = (type: string, preset: any) => {
    const newItem: KitchenItem = {
      id: Date.now().toString(),
      type: type as any,
      x: 50,
      y: 50,
      width: preset.width,
      height: preset.height,
      depth: preset.depth,
      color: preset.color,
      name: preset.name,
      price: preset.price,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    setSelectedItem(null);
  };

  const updateItemColor = (id: string, color: string) => {
    setItems(items.map(item => item.id === id ? { ...item, color } : item));
  };

  const totalCost = items.reduce((sum, item) => sum + item.price, 0);
  const totalArea = (roomWidth[0] * roomDepth[0]) / 10000;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Home" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Kitchen 3D</h1>
              <p className="text-xs text-muted-foreground">Конструктор кухни</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-sm">
              <Icon name="Ruler" size={14} className="mr-1" />
              {totalArea.toFixed(1)} м²
            </Badge>
            <Badge variant="default" className="text-sm font-semibold">
              {totalCost.toLocaleString()} ₽
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="p-6 bg-white shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">3D Визуализация</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Угол обзора</span>
                <Slider
                  value={[viewAngle]}
                  onValueChange={(v) => setViewAngle(v[0])}
                  min={0}
                  max={90}
                  step={5}
                  className="w-32"
                />
                <span className="text-sm font-medium">{viewAngle}°</span>
              </div>
            </div>

            <div className="relative bg-gray-50 rounded-lg border-2 border-gray-200 overflow-hidden" style={{ height: '500px' }}>
              <svg width="100%" height="100%" viewBox="0 0 600 400" className="bg-gradient-to-b from-gray-100 to-gray-200">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#D0D0D0" strokeWidth="0.5" />
                  </pattern>
                  <filter id="shadow">
                    <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3" />
                  </filter>
                </defs>

                <rect width="600" height="400" fill="url(#grid)" />

                <rect x="50" y="350" width={roomWidth[0]} height="40" fill="#E8E8E8" stroke="#999" strokeWidth="2" />
                <polygon
                  points={`50,350 ${50 + roomWidth[0]},350 ${50 + roomWidth[0] + roomDepth[0] * Math.cos((viewAngle * Math.PI) / 180)},${350 - roomDepth[0] * Math.sin((viewAngle * Math.PI) / 180)} ${50 + roomDepth[0] * Math.cos((viewAngle * Math.PI) / 180)},${350 - roomDepth[0] * Math.sin((viewAngle * Math.PI) / 180)}`}
                  fill="#F5F5F5"
                  stroke="#999"
                  strokeWidth="2"
                />

                {items.map((item) => {
                  const perspective = Math.cos((viewAngle * Math.PI) / 180);
                  const heightFactor = Math.sin((viewAngle * Math.PI) / 180);
                  
                  return (
                    <g
                      key={item.id}
                      onClick={() => setSelectedItem(item.id)}
                      className="cursor-pointer transition-transform hover:scale-105"
                      style={{ filter: selectedItem === item.id ? 'url(#shadow)' : 'none' }}
                    >
                      <rect
                        x={50 + item.x}
                        y={350 - item.height}
                        width={item.width}
                        height={item.height}
                        fill={item.color}
                        stroke={selectedItem === item.id ? '#0EA5E9' : '#666'}
                        strokeWidth={selectedItem === item.id ? 3 : 1}
                        rx="2"
                      />
                      <polygon
                        points={`${50 + item.x},${350 - item.height} ${50 + item.x + item.width},${350 - item.height} ${50 + item.x + item.width + item.depth * perspective},${350 - item.height - item.depth * heightFactor} ${50 + item.x + item.depth * perspective},${350 - item.height - item.depth * heightFactor}`}
                        fill={item.color}
                        opacity="0.7"
                        stroke={selectedItem === item.id ? '#0EA5E9' : '#666'}
                        strokeWidth={selectedItem === item.id ? 2 : 1}
                      />
                      <rect
                        x={50 + item.x + item.width}
                        y={350 - item.height}
                        width={item.depth * perspective}
                        height={item.height}
                        fill={item.color}
                        opacity="0.5"
                        stroke={selectedItem === item.id ? '#0EA5E9' : '#666'}
                        strokeWidth={selectedItem === item.id ? 2 : 1}
                      />
                      {selectedItem === item.id && (
                        <text
                          x={50 + item.x + item.width / 2}
                          y={350 - item.height - 5}
                          textAnchor="middle"
                          fontSize="12"
                          fill="#0EA5E9"
                          fontWeight="bold"
                        >
                          {item.name}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>

              {selectedItem && (
                <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
                  <div className="text-sm font-semibold mb-2">
                    {items.find(i => i.id === selectedItem)?.name}
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeItem(selectedItem)}
                    className="w-full"
                  >
                    <Icon name="Trash2" size={14} className="mr-1" />
                    Удалить
                  </Button>
                </div>
              )}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Ширина помещения (см)</label>
                <Slider
                  value={roomWidth}
                  onValueChange={setRoomWidth}
                  min={200}
                  max={600}
                  step={10}
                />
                <span className="text-sm text-muted-foreground mt-1 block">{roomWidth[0]} см</span>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Глубина помещения (см)</label>
                <Slider
                  value={roomDepth}
                  onValueChange={setRoomDepth}
                  min={200}
                  max={600}
                  step={10}
                />
                <span className="text-sm text-muted-foreground mt-1 block">{roomDepth[0]} см</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-4 bg-white shadow-lg">
            <Tabs defaultValue="furniture" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="furniture">
                  <Icon name="Box" size={16} />
                </TabsTrigger>
                <TabsTrigger value="templates">
                  <Icon name="Layout" size={16} />
                </TabsTrigger>
                <TabsTrigger value="materials">
                  <Icon name="Palette" size={16} />
                </TabsTrigger>
              </TabsList>

              <TabsContent value="furniture" className="space-y-3 mt-4">
                <div>
                  <h3 className="text-sm font-semibold mb-2 text-foreground">Шкафы</h3>
                  {cabinetTypes.map((cabinet) => (
                    <Button
                      key={cabinet.id}
                      variant="outline"
                      className="w-full mb-2 justify-start"
                      onClick={() => addItem('cabinet', cabinet)}
                    >
                      <Icon name="Package" size={16} className="mr-2" />
                      <div className="flex-1 text-left">
                        <div className="text-sm">{cabinet.name}</div>
                        <div className="text-xs text-muted-foreground">{cabinet.price.toLocaleString()} ₽</div>
                      </div>
                    </Button>
                  ))}
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-2 text-foreground">Техника</h3>
                  {appliances.map((appliance) => (
                    <Button
                      key={appliance.id}
                      variant="outline"
                      className="w-full mb-2 justify-start"
                      onClick={() => addItem('appliance', appliance)}
                    >
                      <Icon name="Zap" size={16} className="mr-2" />
                      <div className="flex-1 text-left">
                        <div className="text-sm">{appliance.name}</div>
                        <div className="text-xs text-muted-foreground">{appliance.price.toLocaleString()} ₽</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="templates" className="space-y-2 mt-4">
                {templates.map((template) => (
                  <Card key={template.id} className="p-3 hover:bg-accent cursor-pointer transition-colors">
                    <h4 className="font-semibold text-sm">{template.name}</h4>
                    <p className="text-xs text-muted-foreground">{template.description}</p>
                    <div className="text-sm font-medium text-primary mt-1">{template.cost.toLocaleString()} ₽</div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="materials" className="space-y-2 mt-4">
                <p className="text-xs text-muted-foreground mb-2">Выберите элемент для изменения цвета</p>
                {materials.map((material) => (
                  <Button
                    key={material.id}
                    variant="outline"
                    className="w-full justify-start"
                    disabled={!selectedItem}
                    onClick={() => selectedItem && updateItemColor(selectedItem, material.color)}
                  >
                    <div
                      className="w-6 h-6 rounded border-2 border-gray-300 mr-2"
                      style={{ backgroundColor: material.color }}
                    />
                    {material.name}
                  </Button>
                ))}
              </TabsContent>
            </Tabs>
          </Card>

          <Card className="p-4 bg-white shadow-lg">
            <h3 className="text-sm font-semibold mb-3 flex items-center">
              <Icon name="Calculator" size={16} className="mr-2" />
              Расчет
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Площадь:</span>
                <span className="font-medium">{totalArea.toFixed(1)} м²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Элементов:</span>
                <span className="font-medium">{items.length}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between">
                <span className="font-semibold">Итого:</span>
                <span className="font-bold text-primary">{totalCost.toLocaleString()} ₽</span>
              </div>
            </div>
            <Button className="w-full mt-4" size="lg">
              <Icon name="Download" size={18} className="mr-2" />
              Экспортировать проект
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
