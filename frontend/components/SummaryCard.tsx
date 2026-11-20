import type { Sentiment } from "@/data/dummy";

export default function SummaryCard({
  data,
  skor,
}: {
  data: Sentiment;
  skor: number;
}) {
  const delta = data.trend[0].score - data.trend[data.trend.length - 1].score;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-3">
      <h2 className="text-sm font-medium text-slate-500">RINGKASAN</h2>
      <p className="text-lg font-semibold">{data.brand}</p>
      <p className="text-2xl font-bold">Skor Sentimen: {skor}/100</p>
      <p className="text-sm text-rose-500">▼ turun {delta} poin dibanding 7 hari lalu</p>
      <p className="text-xs text-slate-400">
        ℹ️ Dihitung dari persentase ulasan positif dikurangi negatif, dinormalisasi ke 0–100.
      </p>
      <div className="grid grid-cols-3 gap-2 pt-2">
        {[
          { label: "Positif", val: data.positive, color: "bg-emerald-500" },
          { label: "Netral", val: data.neutral, color: "bg-amber-400" },
          { label: "Negatif", val: data.negative, color: "bg-rose-500" },
        ].map((k) => (
          <div key={k.label} className="text-center">
            <p className="text-xs text-slate-500">{k.label}</p>
            <p className="font-semibold">{k.val}%</p>
            <div className="h-2 bg-slate-100 rounded-full mt-1">
              <div className={`h-2 ${k.color} rounded-full`} style={{ width: `${k.val}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
