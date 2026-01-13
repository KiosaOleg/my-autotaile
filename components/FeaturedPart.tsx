"use client";
import { useEffect, useState } from "react";
import { Package } from "lucide-react";

interface PartDetail {
  artId: string;
  articleNumber: string;
  name: string;
  brand: string | null;
  imageUrl: string;
}

export default function FeaturedPartsList() {
  const [parts, setParts] = useState<PartDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/featured-parts")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setParts(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-8">Завантаження...</p>;
  if (parts.length === 0)
    return <p className="text-center py-8">Деталі не знайдені</p>;

  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {parts.map((part) => (
        <div key={part.artId} className="bg-card border rounded-xl p-4">
          <div className="h-48 bg-muted rounded-lg flex items-center justify-center overflow-hidden mb-4">
            {part.imageUrl ? (
              <img
                src={part.imageUrl}
                alt={part.name}
                width={200}
                height={200}
                className="object-contain"
              />
            ) : (
              <Package size={48} className="text-muted-foreground" />
            )}
          </div>
          <h3 className="font-bold">{part.brand ?? "Бренд невідомий"}</h3>
          <p className="text-sm text-muted-foreground">{part.articleNumber}</p>
          <p className="text-sm">{part.name}</p>
        </div>
      ))}
    </section>
  );
}
