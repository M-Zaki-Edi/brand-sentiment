// data/dummy.ts
// Semua data dummy di satu tempat. recommendations masuk tipe Sentiment
// sesuai permintaan Mentor — dan akan ditambahkan ke kontrak API.

export type Recommendation = {
  priority: "TINGGI" | "SEDANG" | "RENDAH";
  action: string;
  reason: string;
};

export type Sentiment = {
  brand: string;
  positive: number;
  neutral: number;
  negative: number;
  trend: { date: string; day: string; score: number }[];
  topics: { label: string; percent: number }[];
  aiSummary: string;
  recommendations: Recommendation[]; // BARU — dipindah dari komponen
};

export const dummyBrands: Record<string, Sentiment> = {
  "kopi kita": {
    brand: "Kopi Kita",
    positive: 53, neutral: 22, negative: 25,
    // Variasi kecil (66,65,66,63,64) — titik terakhir tetap 64
    trend: [
      { date: "14 Nov", day: "Sab", score: 78 },
      { date: "15 Nov", day: "Min", score: 78 },
      { date: "16 Nov", day: "Sen", score: 64 },
      { date: "17 Nov", day: "Sel", score: 66 },
      { date: "18 Nov", day: "Rab", score: 65 },
      { date: "19 Nov", day: "Kam", score: 66 },
      { date: "20 Nov", day: "Jum", score: 64 },
    ],
    topics: [
      { label: "Pengiriman lambat", percent: 42 },
      { label: "Kemasan rusak", percent: 23 },
      { label: "Respon CS lambat", percent: 15 },
    ],
    aiSummary:
      "Sentimen turun karena keluhan pengiriman lambat (42% ulasan negatif). " +
      "Saran: ganti kurir & tampilkan estimasi waktu kirim.",
    recommendations: [
      { priority: "TINGGI", action: "Ganti kurir pengiriman", reason: "Keluhan pengiriman lambat 42%" },
      { priority: "SEDANG", action: "Perbaiki kemasan", reason: "Keluhan kemasan rusak 23%" },
      { priority: "RENDAH", action: "Tambah staf CS", reason: "Keluhan respon CS lambat 15%" },
    ],
  },
  "teh sejuk": {
    brand: "Teh Sejuk",
    positive: 61, neutral: 24, negative: 15,
    trend: [
      { date: "14 Nov", day: "Sab", score: 60 },
      { date: "15 Nov", day: "Min", score: 62 },
      { date: "16 Nov", day: "Sen", score: 63 },
      { date: "17 Nov", day: "Sel", score: 64 },
      { date: "18 Nov", day: "Rab", score: 66 },
      { date: "19 Nov", day: "Kam", score: 68 },
      { date: "20 Nov", day: "Jum", score: 73 }, // naik
    ],
    topics: [
      { label: "Rasa terlalu manis", percent: 35 },
      { label: "Harga naik", percent: 20 },
    ],
    aiSummary:
      "Sentimen naik karena ulasan rasa positif (61% ulasan positif). " +
      "Saran: pertahankan kualitas & tawarkan varian less sugar.",
    recommendations: [
      { priority: "SEDANG", action: "Tawarkan varian less sugar", reason: "Keluhan rasa terlalu manis 35%" },
      { priority: "RENDAH", action: "Komunikasikan nilai harga", reason: "Keluhan harga naik 20%" },
    ],
  },
  "roti manis": {
    brand: "Roti Manis",
    positive: 58, neutral: 22, negative: 20,
    trend: [
      { date: "14 Nov", day: "Sab", score: 65 },
      { date: "15 Nov", day: "Min", score: 66 },
      { date: "16 Nov", day: "Sen", score: 64 },
      { date: "17 Nov", day: "Sel", score: 65 },
      { date: "18 Nov", day: "Rab", score: 66 },
      { date: "19 Nov", day: "Kam", score: 65 },
      { date: "20 Nov", day: "Jum", score: 69 },
    ],
    topics: [
      { label: "Kemasan rusak", percent: 30 },
      { label: "Pengiriman lambat", percent: 18 },
    ],
    aiSummary:
      "Sentimen stabil dengan sedikit kenaikan (58% ulasan positif). " +
      "Saran: perbaiki kemasan & pertahankan pengiriman tepat waktu.",
    recommendations: [
      { priority: "TINGGI", action: "Perbaiki kemasan", reason: "Keluhan kemasan rusak 30%" },
      { priority: "RENDAH", action: "Pertahankan ketepatan kirim", reason: "Keluhan pengiriman lambat 18%" },
    ],
  },
};