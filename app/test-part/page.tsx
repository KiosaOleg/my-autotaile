"use client";

import { useState } from "react";

export default function TestPartPage() {
  const [partId, setPartId] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPart = async () => {
    if (!partId) {
      setError("Введіть ID деталі");
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(`/api/parts/${partId}`);
      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Помилка отримання деталі");
        return;
      }

      setData(result.data);
    } catch (err) {
      setError("Помилка підключення до сервера");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Тест отримання деталі</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            ID деталі (ART_ID):
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={partId}
              onChange={(e) => setPartId(e.target.value)}
              placeholder="Наприклад: 1"
              className="flex-1 px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:border-primary"
            />
            <button
              onClick={fetchPart}
              disabled={loading}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Завантаження..." : "Отримати"}
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500">
            {error}
          </div>
        )}

        {data && (
          <div className="p-6 bg-card border border-border rounded-lg space-y-4">
            <h2 className="text-xl font-semibold">Результат:</h2>
            <div className="space-y-2">
              <div>
                <span className="font-medium">ID:</span> {data.id}
              </div>
              <div>
                <span className="font-medium">Артикул:</span>{" "}
                {data.articleNumber}
              </div>
              <div>
                <span className="font-medium">Бренд:</span> {data.brand}
              </div>
              <div>
                <span className="font-medium">Назва:</span> {data.name}
              </div>
              {data.imageUrl && (
                <div>
                  <span className="font-medium">Зображення:</span>{" "}
                  <a
                    href={data.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {data.imageUrl}
                  </a>
                </div>
              )}
            </div>
            <pre className="mt-4 p-4 bg-muted rounded-lg overflow-auto text-sm">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
