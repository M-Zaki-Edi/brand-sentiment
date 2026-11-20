// components/TopicList.tsx
export default function TopicList({
  topics,
}: {
  topics: { label: string; percent: number }[];
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-sm font-medium text-slate-500 mb-4">
        📋 TOPIK KELUHAN TERATAS (dari ulasan negatif)
      </h2>
      <div className="space-y-3">
        {topics.map((t) => (
          <div key={t.label}>
            <div className="flex justify-between text-sm">
              <span>{t.label}</span>
              <span className="font-medium">{t.percent}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full mt-1">
              <div className="h-2 bg-rose-400 rounded-full" style={{ width: `${t.percent}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}