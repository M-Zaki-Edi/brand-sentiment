// backend/src/data/brands.js
// Data in-memory untuk demo integrasi. Bentuk SAMA PERSIS dengan
// dummyBrands di frontend, sesuai docs/api-contract.md v2.0.
const brands = {
  "kopi kita": {
    brand: "Kopi Kita",
    positive: 53, neutral: 22, negative: 25,
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
    aiSummary: "Sentimen turun karena keluhan pengiriman lambat (42% ulasan negatif). Saran: ganti kurir & tampilkan estimasi waktu kirim.",
    recommendations: [
      { priority: "TINGGI", action: "Ganti kurir pengiriman", reason: "Keluhan pengiriman lambat 42%" },
      { priority: "SEDANG", action: "Perbaiki kemasan", reason: "Keluhan kemasan rusak 23%" },
      { priority: "RENDAH", action: "Tambah staf CS", reason: "Keluhan respon CS lambat 15%" },
    ],
  },
  // teh sejuk & roti manis — sama seperti frontend
};

const publicTrends = [
  { brand: "Kopi Kita", trend: "turun", direction: "down" },
  { brand: "Teh Sejuk", trend: "naik", direction: "up" },
  { brand: "Roti Manis", trend: "naik", direction: "up" },
];

module.exports = { brands, publicTrends };