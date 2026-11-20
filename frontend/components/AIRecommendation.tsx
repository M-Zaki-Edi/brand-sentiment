"use client";
import { useState, useEffect } from "react";
import type { Recommendation } from "@/data/dummy";

export default function AIRecommendation({
  summary,
  recommendations,
}: {
  summary: string;
  recommendations: Recommendation[];
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-3">
      <h2 className="text-sm font-medium text-slate-500">💡 REKOMENDASI AI</h2>
      <p className="text-sm leading-relaxed">{summary}</p>
      <button 
        onClick={() => setOpen(true)} 
        className="text-sm text-blue-600 font-medium hover:underline"
      >
        Lihat saran lengkap →
      </button>
      {open && (
        <div 
          className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div role="dialog" className="bg-white rounded-xl p-6 max-w-lg w-full space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">SARAN LENGKAP</h3>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>
            {recommendations.map((s, i) => (
              <div key={i} className="border-l-4 border-blue-500 pl-3">
                <p className="text-xs font-bold text-blue-600">{s.priority}</p>
                <p className="font-medium">{s.action}</p>
                <p className="text-xs text-slate-500">→ {s.reason}</p>
              </div>
            ))}
            <button 
              onClick={() => setOpen(false)} 
              className="w-full bg-slate-100 rounded-lg py-2"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
