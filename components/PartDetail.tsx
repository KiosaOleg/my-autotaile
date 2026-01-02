"use client";

import { useState } from "react";
import { Search, Loader2, AlertCircle, Package } from "lucide-react";

interface PartData {
  id: number;
  articleNumber: string;
  brand: string;
  name: string;
  imageUrl: string | null;
}

interface PartDetailProps {
  initialPartId?: number;
}

export default function PartDetail({ initialPartId }: PartDetailProps) {
  const [partId, setPartId] = useState(initialPartId?.toString() || "");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PartData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPart = async () => {
    if (!partId) {
      setError("Введіть ID деталі");
      return;
    }

    const id = parseInt(partId, 10);
    if (isNaN(id) || id <= 0) {
      setError("Невірний ID деталі");
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(`/api/parts/${id}`);
      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Помилка отримання деталі");
        return;
      }

      setData(result.data);
    } catch (err) {
      setError("Помилка підключення до сервера");
      console.error("Part fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchPart();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Заголовок */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Пошук деталі за ID
        </h2>
        <p className="text-sm text-muted-foreground">
          Введіть ID деталі (ART_ID) для отримання повної інформації
        </p>
      </div>

      {/* Пошук */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="number"
            value={partId}
            onChange={(e) => {
              setPartId(e.target.value);
              setError(null);
            }}
            onKeyPress={handleKeyPress}
            placeholder="Введіть ID деталі (наприклад: 1, 100, 500)"
            disabled={loading}
            className="w-full pl-12 pr-4 py-3 border border-border rounded-xl bg-card text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all disabled:opacity-50"
          />
        </div>
        <button
          onClick={fetchPart}
          disabled={loading || !partId}
          className="px-6 py-3 bg-secondary hover:bg-(--brand-black-soft) text-secondary-foreground font-semibold rounded-xl shadow-lg transition-all uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Завантаження...
            </>
          ) : (
            <>
              <Search size={18} />
              Знайти
            </>
          )}
        </button>
      </div>

      {/* Помилка */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-start gap-3">
          <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-red-500 font-medium">Помилка</p>
            <p className="text-red-500/80 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Результат */}
      {data && (
        <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Package size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">
                Деталь #{data.id}
              </h3>
              <p className="text-sm text-muted-foreground">
                Повна інформація про деталь
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Зображення */}
            {data.imageUrl && (
              <div className="md:col-span-2">
                <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden border border-border bg-muted">
                  <img
                    src={data.imageUrl}
                    alt={data.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                </div>
              </div>
            )}

            {/* Основна інформація */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Артикул
                </label>
                <p className="text-lg font-semibold text-foreground mt-1">
                  {data.articleNumber}
                </p>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Бренд
                </label>
                <p className="text-lg font-semibold text-foreground mt-1">
                  {data.brand}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Назва
                </label>
                <p className="text-lg text-foreground mt-1">{data.name}</p>
              </div>

              {data.imageUrl && (
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    URL зображення
                  </label>
                  <a
                    href={data.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline break-all block mt-1"
                  >
                    {data.imageUrl}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* JSON для розробки */}
          <details className="mt-6">
            <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Показати JSON (для розробки)
            </summary>
            <pre className="mt-3 p-4 bg-muted rounded-lg overflow-auto text-xs">
              {JSON.stringify(data, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
}
