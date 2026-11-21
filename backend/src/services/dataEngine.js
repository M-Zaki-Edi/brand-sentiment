// backend/src/services/dataEngine.js
// Engine ini mengecek database lokal dulu, jika tidak ada baru men-generate simulasi.

const { brands } = require('../data/brands'); // Data Kopi Kita, Teh Sejuk, dll ada di sini

async function fetchBrandData(brandName) {
  const normalizedName = brandName.trim().toLowerCase();

  // 1. Cek apakah brand ada di data lokal (Kopi Kita, Teh Sejuk, Roti Manis)
  if (brands[normalizedName]) {
    return brands[normalizedName]; 
  }

  // 2. Jika brand BARU (Dior, Speed, dll), gunakan simulasi dinamis
  // Di produksi, bagian ini diganti dengan panggilan API pihak ketiga (Google Places/SerpApi)
  const hash = normalizedName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const positive = 40 + (hash % 30);
  const negative = 10 + (hash % 15);
  const neutral = 100 - positive - negative;

  const trend = Array.from({ length: 7 }, (_, i) => ({
    date: `${14 + i} Nov`,
    day: ["Sab", "Min", "Sen", "Sel", "Rab", "Kam", "Jum"][i],
    score: 60 + (hash % 20) + (i % 3 === 0 ? -2 : 1)
  }));

  return {
    brand: brandName, // Tampilkan nama sesuai input user
    positive,
    neutral,
    negative,
    trend,
    topics: [
      { label: "Kualitas produk", percent: 30 + (hash % 20) },
      { label: "Layanan pelanggan", percent: 15 + (hash % 10) },
      { label: "Harga", percent: 10 + (hash % 5) }
    ],
    aiSummary: `Analisis untuk ${brandName} menunjukkan sentimen yang perlu diperhatikan.`,
    recommendations: [
      { priority: "TINGGI", action: "Tingkatkan kualitas", reason: "Berdasarkan keluhan pengguna" },
      { priority: "SEDANG", action: "Respons cepat", reason: "Untuk layanan pelanggan" },
      { priority: "RENDAH", action: "Evaluasi harga", reason: "Daya saing pasar" }
    ]
  };
}

module.exports = { fetchBrandData };