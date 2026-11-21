// frontend/app/page.tsx
"use client";
import { useState } from "react";
import { hitungSkor } from "@/lib/score";
import { dummyBrands, type Sentiment } from "@/data/dummy";
import BrandInput from "@/components/BrandInput";
import SummaryCard from "@/components/SummaryCard";
import AIRecommendation from "@/components/AIRecommendation";
import SentimentChart from "@/components/SentimentChart";
import TopicList from "@/components/TopicList";
import { EmptyState, LoadingState, ErrorState } from "@/components/States";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

type Status = "kosong" | "loading" | "hasil" | "error" | "demo-info";

export default function Dashboard() {
  const [status, setStatus] = useState<Status>("kosong");
  const [brand, setBrand] = useState("");
  const [data, setData] = useState<Sentiment | null>(null);
  const [demoMessage, setDemoMessage] = useState("");

  const handlePantau = async (nama: string) => {
    const key = nama.trim();
    if (!key) return;
    
    setBrand(key);
    setStatus("loading");

    // Fallback jika API belum live
    if (!API_URL) {
      setTimeout(() => {
        if (dummyBrands[key.toLowerCase()]) {
          setData(dummyBrands[key.toLowerCase()]);
          setStatus("hasil");
        } else {
          setDemoMessage("Brand belum tersedia di demo. Di versi produksi, data akan diambil dari API Sosial Media (X, TikTok, Shopee).");
          setStatus("demo-info");
        }
      }, 800);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/sentiment?brand=${encodeURIComponent(key)}`);
      
      if (res.status === 404) {
        const json = await res.json();
        setDemoMessage(json.message);
        setStatus("demo-info");
        return;
      }
      
      if (!res.ok) throw new Error("Server error");

      const json = await res.json();
      setData(json);
      setStatus("hasil");
    } catch (err) {
      // Fallback ke data dummy jika backend mati
      if (dummyBrands[key.toLowerCase()]) {
        setData(dummyBrands[key.toLowerCase()]);
        setStatus("hasil");
      } else {
        setDemoMessage("Gagal menghubungi server. Brand ini belum tersedia di data demo.");
        setStatus("demo-info");
      }
    }
  };

  const skor = data ? hitungSkor(data.positive, data.negative) : 0;

  return (
    <div className="space-y-6">
      <BrandInput onPantau={handlePantau} compact={status === "hasil"} />
      
      {status === "kosong" && <EmptyState />}
      {status === "loading" && <LoadingState brand={brand} />}
      
      {/* STATE BARU: Pesan Jujur Demo */}
      {status === "demo-info" && (
        <div className="flex flex-col items-center justify-center h-64 text-slate-500 gap-3">
          <p className="text-3xl">ℹ️</p>
          <p className="font-medium text-lg">Simulasi Demo</p>
          <p className="text-sm text-center max-w-md">{demoMessage}</p>
          <button onClick={() => setStatus("kosong")} className="bg-slate-100 rounded-lg px-4 py-2 mt-2">
            Coba lagi
          </button>
        </div>
      )}

      {status === "hasil" && data && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SummaryCard data={data} skor={skor} />
            <AIRecommendation summary={data.aiSummary} recommendations={data.recommendations} />
          </div>
          <SentimentChart data={data.trend} />
          <TopicList topics={data.topics} />
        </>
      )}
    </div>
  );
}