"use client";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ReferenceDot, ResponsiveContainer,
} from "recharts";

export default function SentimentChart({
  data,
}: {
  data: { date: string; day: string; score: number }[];
}) {
  const low = data.reduce((a, b) => (b.score < a.score ? b : a), data[0]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-sm font-medium text-slate-500 mb-4">📈 TREN SENTIMEN (14–20 NOV)</h2>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis domain={[50, 85]} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} dot />
          <ReferenceDot x={low.date} y={low.score} r={6} fill="#f43f5e" stroke="white" />
        </LineChart>
      </ResponsiveContainer>
      <p className="text-xs text-rose-500 mt-2">● anjlok {low.date} ({low.day})</p>
    </div>
  );
}
