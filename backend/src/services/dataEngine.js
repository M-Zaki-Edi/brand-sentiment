// backend/src/services/dataEngine.js
const axios = require('axios');

// Fungsi untuk mengambil data dari API eksternal (sementara pakai mock generator)
async function fetchBrandData(brandName) {
  const normalizedName = brandName.trim().toLowerCase();

  // Di produksi: Panggil API (Google Reviews/SerpApi)
  // const response = await axios.get(`https://api.contoh.com/search?q=${normalizedName}`);
  
  // SIMULASI ENGINE: Menghasilkan data sentimen secara dinamis berdasarkan nama brand.
  // Ini memastikan brand apapun (Dior, Speed, Aoka) MENDAPAT RESPONS, bukan error hardcoded.
  const hash = normalizedName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const positive = 40 + (hash % 30); // Angka dinamis 40-70%
  const negative = 10 + (hash % 15); // Angka dinamis 10-25%
  const neutral = 100 - positive - negative;

  // Simulasi tren 7 hari
  const trend = Array.from({ length: 7 }, (_, i) => ({
    date: `${14 + i} Nov`,
    day: ["Sab", "Min", "Sen", "Sel", "Rab", "Kam", "Jum"][i],
    score: 60 + (hash % 20) + (i % 3 === 0 ? -2 : 1) // Skor fluktuatif
  }));

  return {
    brand: brandName,
    positive,
    neutral,
    negative,
    trend,
    topics: [
      { label: "Kualitas produk", percent: 30 + (hash % 20) },
      { label: "Layanan pelanggan", percent: 15 + (hash % 10) },
      { label: "Harga", percent: 10 + (hash % 5) }
    ],
    // AI Summary statis dulu (karena AI belum diprioritaskan)
    aiSummary: `Analisis untuk ${brandName} menunjukkan sentimen yang perlu diperhatikan.`,
    recommendations: [
      { priority: "TINGGI", action: "Tingkatkan kualitas", reason: "Berdasarkan keluhan pengguna" },
      { priority: "SEDANG", action: "Respons cepat", reason: "Untuk layanan pelanggan" },
      { priority: "RENDAH", action: "Evaluasi harga", reason: "Daya saing pasar" }
    ]
  };
}

module.exports = { fetchBrandData };