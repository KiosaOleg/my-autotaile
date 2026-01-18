"use client";

import { useEffect, useState } from "react";
import { Package, Search, Info, Settings, Euro, DollarSign, Warehouse } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface UniqTradePart {
  id: number;
  article: string;
  title: string;
  brand?: {
    name: string;
    externalCode: string;
  };
  displayBrand?: string;
  yourPrice?: {
    amount: number;
    currency: {
      code: string;
    };
  };
  yourPriceUAH?: {
    amount: number;
    currency: {
      code: string;
    };
  };
  yourPriceEUR?: {
    amount: number;
    currency: {
      code: string;
    };
  };
  remains?: any[];
  images?: Array<{
    imagePath: string;
    fullImagePath: string;
    thumbnail: string;
    thumbnail2: string;
  }>;
  category?: {
    name: string;
  };
  units?: Array<{
    weightFull?: {
      value: string;
      unit: string;
    };
    dimensions?: {
      length?: {
        value: string;
        unit: string;
      };
      width?: {
        value: string;
        unit: string;
      };
      height?: {
        value: string;
        unit: string;
      };
    };
  }>;
  scanCodes?: string[];
  multiplicity?: number;
  quantity?: number;
  modifier?: number;
  hasPartnerRemain?: boolean;
  [key: string]: any;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    searchResults: UniqTradePart[];
    selectedPart: UniqTradePart;
    partInfo: any;
    characteristics: any;
  } | null;
  timestamp: string;
  error?: string;
}

export default function UniqTradeTest() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchArticle, setSearchArticle] = useState("OC90");
  const [currentArticle, setCurrentArticle] = useState("OC90");
  const [mountedTime, setMountedTime] = useState<string>("");

  // Використовуємо useEffect для встановлення часу після монтування компонента
  useEffect(() => {
    setMountedTime(new Date().toLocaleString("uk-UA"));
  }, []);

  const fetchPartInfo = async (article: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/test/uniqtrade-parts?article=${encodeURIComponent(article)}`);
      const result: ApiResponse = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching part info:", error);
      setData({
        success: false,
        message: "Помилка при завантаженні даних",
        data: null,
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Невідома помилка",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartInfo(currentArticle);
  }, [currentArticle]);

  const handleSearch = () => {
    setCurrentArticle(searchArticle);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Не блокуємо рендеринг при завантаженні - показуємо компонент одразу

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Тестування UniqTrade API
        </CardTitle>
        <CardDescription>
          Пошук та відображення інформації про автозапчастини з бази UniqTrade
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">

        {/* Статичний елемент, який завжди видно */}
        <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
              <Package className="h-4 w-4" />
              <span className="font-medium">Компонент завантажено успішно!</span>
            </div>
            <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
              Час: {mountedTime || "Завантаження..."}
            </p>
          </CardContent>
        </Card>

        {/* Пошук */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Search className="h-4 w-4" />
              Пошук деталей
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchArticle}
                onChange={(e) => setSearchArticle(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Введіть артикул деталі (наприклад: OC90)"
                className="flex-1 px-3 py-2 border border-input rounded-md bg-background"
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 flex items-center gap-2"
              >
                <Search className="h-4 w-4" />
                Пошук
              </button>
            </div>

            {/* Кнопки для швидкого тестування */}
            <div className="flex gap-2 flex-wrap">
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900"
                onClick={() => setCurrentArticle("OC90")}
              >
                OC90 (масляний фільтр)
              </Badge>
              <Badge
                variant="secondary"
                className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => setCurrentArticle("OC123")}
              >
                OC123 (тест)
              </Badge>
              <Badge
                variant="secondary"
                className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => setCurrentArticle("BP123")}
              >
                BP123 (тест)
              </Badge>
              <Badge
                variant={loading ? "secondary" : "default"}
                className={`cursor-pointer ${!loading ? 'hover:bg-green-600' : ''}`}
                onClick={() => !loading && fetchPartInfo(currentArticle)}
              >
                {loading ? 'Завантаження...' : '🔄 Оновити'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Індикатор завантаження */}
        {loading && (
          <Card className="border-yellow-200 bg-yellow-50/50 dark:bg-yellow-950/20">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                <div className="animate-spin h-4 w-4 border-2 border-yellow-600 border-t-transparent rounded-full"></div>
                <span>Завантаження даних з UniqTrade API...</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Статус відповіді */}
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div className={`px-3 py-1 rounded-md text-sm ${
                data?.success
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : data ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
              }`}>
                {data?.message || (loading ? "Ініціалізація запиту..." : "Очікування даних")}
              </div>
              <Badge variant="outline" className="text-xs">
                {data?.timestamp ? new Date(data.timestamp).toLocaleTimeString("uk-UA") : mountedTime}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Завжди видимий тестовий елемент із прикладом деталі */}
        <Card className="border-orange-200 bg-orange-50/50 dark:bg-orange-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-orange-800 dark:text-orange-200 flex items-center gap-2">
              📋 Статус системи
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Статичний приклад */}
            <Card className="mb-4">
              <CardContent className="pt-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">Приклад деталі з системи</p>
                    <p className="text-sm text-muted-foreground">Артикул: DEMO • Бренд: TestBrand</p>
                  </div>
                  <Badge>Демо</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Ціна:</span>
                  <span className="font-bold text-green-600">999.99 ₴</span>
                </div>
              </CardContent>
            </Card>

            {/* Інформація про стан компонента */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="w-2 h-2 p-0 bg-green-500"></Badge>
                  <span>Компонент завантажено</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="default"
                    className={`w-2 h-2 p-0 ${data ? (data.success ? 'bg-green-500' : 'bg-red-500') : 'bg-yellow-500'}`}
                  ></Badge>
                  <span>API статус</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">
                  Поточний артикул: <Badge variant="outline" className="text-xs">{currentArticle}</Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  Час: {mountedTime}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {data?.success && data.data ? (
          <div className="space-y-6">
            {/* Результати пошуку */}
            {data.data.searchResults && data.data.searchResults.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Результати пошуку
                    <Badge variant="secondary">{data.data.searchResults.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 max-h-60 overflow-y-auto">
                    {data.data.searchResults.map((part, index) => (
                      <Card key={part.id || index} className="bg-muted/30">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <h5 className="font-medium text-sm">{part.title}</h5>
                                {part.category && (
                                  <Badge variant="outline" className="text-xs">{part.category.name}</Badge>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-2 mb-2">
                                <Badge variant="secondary" className="text-xs font-mono">{part.article}</Badge>
                                {part.brand && <Badge variant="outline" className="text-xs">{part.brand.name}</Badge>}
                              </div>
                              {part.yourPriceUAH && part.yourPriceUAH.amount > 0 && (
                                <div className="text-sm font-bold text-green-600">
                                  {part.yourPriceUAH.amount} {part.yourPriceUAH.currency.code}
                                </div>
                              )}
                            </div>
                            {part.remains && part.remains.length > 0 && (
                              <div className="ml-4 text-right">
                                {part.remains.slice(0, 2).map((remain, idx) => (
                                  <Badge
                                    key={idx}
                                    variant={parseInt(remain.remain) > 0 ? "default" : "destructive"}
                                    className={`text-xs block mb-1 ${parseInt(remain.remain) > 0 ? "bg-green-600 hover:bg-green-700" : ""}`}
                                  >
                                    {remain.storage.name}: {remain.remain} шт.
                                  </Badge>
                                ))}
                                {part.remains.length > 2 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{part.remains.length - 2} складів
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

          {/* Детальна інформація про вибрану деталь */}
          {data.data.selectedPart && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Info className="h-4 w-4" />
                <h4 className="font-medium">Детальна інформація</h4>
              </div>
              <div className="border rounded-lg p-4 bg-muted/30">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Назва</p>
                    <p className="font-medium">{data.data.selectedPart.title}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Артикул</p>
                    <p className="font-medium">{data.data.selectedPart.article}</p>
                  </div>
                  {data.data.selectedPart.brand && (
                    <div>
                      <p className="text-sm text-muted-foreground">Бренд</p>
                      <p className="font-medium">{data.data.selectedPart.brand.name}</p>
                    </div>
                  )}
                  {data.data.selectedPart.displayBrand && data.data.selectedPart.displayBrand !== data.data.selectedPart.brand?.name && (
                    <div>
                      <p className="text-sm text-muted-foreground">Відображуваний бренд</p>
                      <p className="font-medium">{data.data.selectedPart.displayBrand}</p>
                    </div>
                  )}
                  {data.data.selectedPart.category && (
                    <div>
                      <p className="text-sm text-muted-foreground">Категорія</p>
                      <p className="font-medium">{data.data.selectedPart.category.name}</p>
                    </div>
                  )}
                  {data.data.selectedPart.yourPriceUAH && data.data.selectedPart.yourPriceUAH.amount > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground">Ціна (UAH)</p>
                      <p className="font-medium text-green-600">
                        {data.data.selectedPart.yourPriceUAH.amount} {data.data.selectedPart.yourPriceUAH.currency.code}
                      </p>
                    </div>
                  )}
                  {data.data.selectedPart.yourPriceEUR && data.data.selectedPart.yourPriceEUR.amount > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground">Ціна (EUR)</p>
                      <p className="font-medium text-blue-600">
                        {data.data.selectedPart.yourPriceEUR.amount} {data.data.selectedPart.yourPriceEUR.currency.code}
                      </p>
                    </div>
                  )}
                  {data.data.selectedPart.scanCodes && data.data.selectedPart.scanCodes.length > 0 && (
                    <div className="md:col-span-2">
                      <p className="text-sm text-muted-foreground">Штрих-коди</p>
                      <p className="font-medium text-xs">{data.data.selectedPart.scanCodes.join(", ")}</p>
                    </div>
                  )}
                  {data.data.selectedPart.images && data.data.selectedPart.images.length > 0 && (
                    <div className="md:col-span-2">
                      <p className="text-sm text-muted-foreground">Зображення</p>
                      <div className="flex gap-2 mt-1">
                        {data.data.selectedPart.images.slice(0, 3).map((image, idx) => (
                          <img
                            key={idx}
                            src={image.thumbnail2}
                            alt={`Зображення ${idx + 1}`}
                            className="w-16 h-16 object-cover rounded border"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Інформація про знайдену деталь */}
          {data.data.selectedPart && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Package className="h-5 w-5" />
                <h4 className="font-semibold text-lg">Знайдена деталь</h4>
              </div>

              {/* Основна картка деталі */}
              <Card className="bg-linear-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 border-2">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    {data.data.selectedPart.title}
                  </CardTitle>
                  <CardDescription>
                    Артикул: <Badge variant="secondary" className="font-mono">{data.data.selectedPart.article}</Badge>
                    {data.data.selectedPart.brand && (
                      <>
                        {" • "}
                        <Badge variant="outline">{data.data.selectedPart.brand.name}</Badge>
                      </>
                    )}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Ліва колонка - зображення та основна інформація */}
                    <div className="space-y-4">
                      {/* Зображення */}
                      {data.data.selectedPart.images && data.data.selectedPart.images.length > 0 && (
                        <div className="relative">
                          <AspectRatio ratio={4 / 3} className="bg-muted rounded-lg overflow-hidden">
                            <img
                              src={data.data.selectedPart.images[0].fullImagePath}
                              alt={data.data.selectedPart.title}
                              className="object-cover w-full h-full"
                            />
                          </AspectRatio>
                          {data.data.selectedPart.images.length > 1 && (
                            <Badge className="absolute bottom-2 right-2">
                              +{data.data.selectedPart.images.length - 1} фото
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* Основна інформація */}
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">Основна інформація</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {data.data.selectedPart.category && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Категорія:</span>
                              <Badge variant="secondary">{data.data.selectedPart.category.name}</Badge>
                            </div>
                          )}

                          {data.data.selectedPart.scanCodes && data.data.selectedPart.scanCodes.length > 0 && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Штрих-код:</span>
                              <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                                {data.data.selectedPart.scanCodes[0]}
                              </span>
                            </div>
                          )}

                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Кількість в упаковці:</span>
                            <span className="font-medium">{data.data.selectedPart.quantity || 1} шт.</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Права колонка - ціни та наявність */}
                    <div className="space-y-4">
                      {/* Ціни */}
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-green-600" />
                            Ціни
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {data.data.selectedPart.yourPriceUAH && data.data.selectedPart.yourPriceUAH.amount > 0 && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Ціна UAH:</span>
                              <span className="text-xl font-bold text-green-600">
                                {data.data.selectedPart.yourPriceUAH.amount} ₴
                              </span>
                            </div>
                          )}

                          {data.data.selectedPart.yourPriceEUR && data.data.selectedPart.yourPriceEUR.amount > 0 && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm flex items-center gap-1">
                                <Euro className="h-3 w-3" />
                                Ціна EUR:
                              </span>
                              <span className="text-lg font-semibold text-blue-600">
                                {data.data.selectedPart.yourPriceEUR.amount} €
                              </span>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      {/* Наявність на складах */}
                      {data.data.selectedPart.remains && data.data.selectedPart.remains.length > 0 && (
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                              <Warehouse className="h-4 w-4 text-orange-600" />
                              Наявність на складах
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {data.data.selectedPart.remains.map((remain, idx) => (
                                <div key={idx} className="flex justify-between items-center">
                                  <span className="text-sm">{remain.storage.name}:</span>
                                  <Badge
                                    variant={parseInt(remain.remain) > 0 ? "default" : "destructive"}
                                    className={parseInt(remain.remain) > 0 ? "bg-green-600 hover:bg-green-700" : ""}
                                  >
                                    {remain.remain} шт.
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Технічні характеристики */}
                      {data.data.selectedPart.units && data.data.selectedPart.units.length > 0 && (
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                              <Settings className="h-4 w-4 text-purple-600" />
                              Технічні характеристики
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {data.data.selectedPart.units[0].weightFull && (
                                <div className="flex justify-between">
                                  <span className="text-sm">Вага:</span>
                                  <span className="font-medium">
                                    {data.data.selectedPart.units[0].weightFull.value} {data.data.selectedPart.units[0].weightFull.unit}
                                  </span>
                                </div>
                              )}

                              <Separator />

                              {data.data.selectedPart.units[0].dimensions && (
                                <div className="space-y-2">
                                  <div className="text-sm font-medium text-muted-foreground mb-2">Розміри:</div>
                                  {data.data.selectedPart.units[0].dimensions.length && (
                                    <div className="flex justify-between text-sm">
                                      <span>Довжина:</span>
                                      <span>{data.data.selectedPart.units[0].dimensions.length.value} {data.data.selectedPart.units[0].dimensions.length.unit}</span>
                                    </div>
                                  )}
                                  {data.data.selectedPart.units[0].dimensions.width && (
                                    <div className="flex justify-between text-sm">
                                      <span>Ширина:</span>
                                      <span>{data.data.selectedPart.units[0].dimensions.width.value} {data.data.selectedPart.units[0].dimensions.width.unit}</span>
                                    </div>
                                  )}
                                  {data.data.selectedPart.units[0].dimensions.height && (
                                    <div className="flex justify-between text-sm">
                                      <span>Висота:</span>
                                      <span>{data.data.selectedPart.units[0].dimensions.height.value} {data.data.selectedPart.units[0].dimensions.height.unit}</span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>

                  {/* Додаткові зображення */}
                  {data.data.selectedPart.images && data.data.selectedPart.images.length > 1 && (
                    <>
                      <Separator />
                      <div>
                        <h6 className="font-medium mb-3 flex items-center gap-2">
                          <Info className="h-4 w-4" />
                          Додаткові зображення
                        </h6>
                        <div className="flex gap-3 overflow-x-auto pb-2">
                          {data.data.selectedPart.images.slice(1, 6).map((image, idx) => (
                            <div key={idx} className="shrink-0">
                              <AspectRatio ratio={1} className="w-20 bg-muted rounded-md overflow-hidden">
                                <img
                                  src={image.thumbnail2}
                                  alt={`Зображення ${idx + 2}`}
                                  className="object-cover w-full h-full cursor-pointer hover:opacity-80 transition-opacity"
                                />
                              </AspectRatio>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
        ) : data && !data.success ? (
          <Card className="border-red-200 bg-red-50/50 dark:bg-red-950/20">
            <CardContent className="pt-6 text-center">
              <Package className="h-12 w-12 mx-auto mb-4 opacity-50 text-red-500" />
              <h3 className="font-medium text-red-800 dark:text-red-200 mb-2">
                Не вдалося завантажити інформацію про деталь
              </h3>
              {data?.error && (
                <p className="text-sm text-red-600 dark:text-red-300 mb-4">{data.error}</p>
              )}
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="pt-4">
                  <p className="text-sm font-medium mb-2">Спробуйте інші артикули:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Badge variant="outline" className="cursor-pointer hover:bg-blue-100" onClick={() => setCurrentArticle("OC90")}>
                      OC90 (масляний фільтр)
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-gray-100" onClick={() => setCurrentArticle("OC123")}>
                      OC123
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-gray-100" onClick={() => setCurrentArticle("BP123")}>
                      BP123
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        ) : null}
      </CardContent>
    </Card>
  );
}