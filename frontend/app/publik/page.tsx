"use client";
import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

type TrendItem = {
  brand: string;
  trend: string;
  direction: "up" | "down";
};

export default function PublicPage() {
  const [trends, setTrends] = useState<TrendItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/public/trends`)
      .then((res) => res.json())
      .then((data) => setTrends(data))
      .catch(() => setTrends([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Laporan Tren Brand Publik</h1>

      {/* SATU slot iklan placeholder saja */}
      <div className="border-2 border-dashed border-slate-300 rounded-xl h-24 flex items-center justify-center text-slate-400 text-sm">
        [ Iklan AdSense — placeholder ]
      </div>

      {loading ? (
        <p className="text-center text-slate-500 py-8">⏳ Memuat data...</p>
      ) : trends.length === 0 ? (
        <p className="text-center text-slate-500 py-8">Gagal memuat data tren.</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm divide-y">
          {trends.map((b) => (
            <div key={b.brand} className="flex items-center justify-between px-6 py-4">
              <span className="font-medium">{b.brand}</span>
              <div className="flex items-center gap-3">
                {/* Teks naik/turun + arah, bukan cuma warna */}
                <span className={b.direction === "up" ? "text-emerald-600" : "text-rose-600"}>
                  {b.direction === "up" ? "▲ naik" : "▼ turun"}
                </span>
                <span className="text-sm text-slate-500">
                  {b.trend === "naik" ? "tren positif" : "tren negatif"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-slate-400">
        *Data publik bersifat indikatif. Monetisasi (AdSense) adalah strategi tahap berikutnya.
      </p>
    </div>
  );
}
