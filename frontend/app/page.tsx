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

type Status = "kosong" | "loading" | "hasil" | "error";

export default function Dashboard() {
  const [status, setStatus] = useState<Status>("kosong");
  const [brand, setBrand] = useState("");
  const [data, setData] = useState<Sentiment | null>(null);

  const handlePantau = async (nama: string) => {
    const key = nama.trim();
    if (!key) return;
    
    setBrand(key);
    setStatus("loading");

    const keyLower = key.toLowerCase();

    // JIKA API_URL KOSONG (backend belum siap), LANGSUNG PAKAI DUMMY
    if (!API_URL) {
      setTimeout(() => {
        if (dummyBrands[keyLower]) {
          setData(dummyBrands[keyLower]);
          setStatus("hasil");
        } else {
          setStatus("error"); // Brand asing belum didukung di mode dummy
        }
      }, 800);
      return;
    }

    // JIKA API_URL ADA, COBA FETCH KE BACKEND
    try {
      const res = await fetch(`${API_URL}/api/sentiment?brand=${encodeURIComponent(key)}`);
      
      // JIKA BACKEND ERROR / GAGAL, FALLBACK KE DUMMY (biar web gak kosong)
      if (!res.ok) {
        if (dummyBrands[keyLower]) {
          setData(dummyBrands[keyLower]);
          setStatus("hasil");
        } else {
          setStatus("error");
        }
        return;
      }

      const json = await res.json();
      setData(json);
      setStatus("hasil");
    } catch (err) {
      console.error("Fetch gagal, fallback ke dummy:", err);
      // FALLBACK JIKA KONEKSI PUTUS
      if (dummyBrands[keyLower]) {
        setData(dummyBrands[keyLower]);
        setStatus("hasil");
      } else {
        setStatus("error");
      }
    }
  };

  const skor = data ? hitungSkor(data.positive, data.negative) : 0;

  return (
    <div className="space-y-6">
      <BrandInput onPantau={handlePantau} compact={status === "hasil"} />
      
      {status === "kosong" && <EmptyState />}
      {status === "loading" && <LoadingState brand={brand} />}
      {status === "error" && <ErrorState onRetry={() => setStatus("kosong")} />}
      
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