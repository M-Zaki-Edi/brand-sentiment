// components/States.tsx
// Loading pakai teks langkah bergantian — BUKAN progress bar palsu.
"use client";
import { useEffect, useState } from "react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-slate-400">
      <p className="text-3xl">🔍</p>
      <p className="font-medium">Belum ada brand</p>
      <p className="text-sm">Masukkan nama brand di atas untuk mulai menganalisis.</p>
    </div>
  );
}

export function LoadingState({ brand }: { brand: string }) {
  const langkah = ["Mengambil ulasan", "Menganalisis sentimen", "Menyusun rekomendasi"];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % langkah.length), 600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-3">
      <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      <p className="font-medium">Menganalisis &quot;{brand}&quot;...</p>
      <p className="text-sm text-slate-500">{langkah[idx]}...</p>
    </div>
  );
}

export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-3">
      <p className="text-3xl">😕</p>
      <p className="font-medium">Brand tidak ditemukan</p>
      <p className="text-sm text-slate-500">Coba periksa ejaan atau gunakan nama brand lain.</p>
      <button onClick={onRetry} className="bg-slate-100 rounded-lg px-4 py-2 text-sm">
        Coba lagi
      </button>
    </div>
  );
}