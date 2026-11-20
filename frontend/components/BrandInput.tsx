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
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          onPantau(nama);
        }} 
        className="flex gap-2 items-center"
      >
        <input
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Cari brand lain..."
          className="flex-1 border rounded-lg px-3 py-2 text-sm"
        />
        <button type="submit" className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm">
          Pantau
        </button>
      </form>
    );
  }

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        onPantau(nama);
      }} 
      className="space-y-2"
    >
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Masukkan nama brand..."
          className="flex-1 border rounded-lg px-4 py-3"
        />
        <button type="submit" className="bg-blue-600 text-white rounded-lg px-6 py-3 font-medium">
          Pantau
        </button>
      </div>
      <div className="flex gap-2 text-xs text-slate-500">
        <span className="px-2 py-1 bg-slate-100 rounded-full">Google Review</span>
        <span className="px-2 py-1 bg-slate-100 rounded-full">Instagram — segera hadir</span>
      </div>
    </form>
  );
}
