"use client";
import { useState } from "react";

export default function BrandInput({
  onPantau,
  compact,
}: {
  onPantau: (nama: string) => void;
  compact?: boolean;
}) {
  const [nama, setNama] = useState("");

  if (compact) {
    return (
      <div className="flex gap-2 items-center bg-white p-2 rounded-xl shadow-sm border border-slate-200">
        <input
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Cari brand lain..."
          className="flex-1 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
        />
        <button
          onClick={() => onPantau(nama)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
        >
          Pantau
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <form
        onSubmit={(e) => { e.preventDefault(); onPantau(nama); }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <input
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Masukkan nama brand (contoh: Kopi Kita)..."
          className="flex-1 border border-slate-300 rounded-xl px-5 py-4 text-lg shadow-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 py-4 font-semibold text-lg shadow-sm transition-colors"
        >
          Pantau
        </button>
      </form>
      <div className="flex gap-2 text-xs font-medium text-slate-500">
        <span className="px-3 py-1.5 bg-slate-200/50 rounded-full border border-slate-200">Google Review</span>
        <span className="px-3 py-1.5 bg-slate-200/50 rounded-full border border-slate-200 text-slate-400">Instagram — segera hadir</span>
      </div>
    </div>
  );
}