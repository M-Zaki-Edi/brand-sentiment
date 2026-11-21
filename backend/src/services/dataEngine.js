// backend/src/services/dataEngine.js
// TIDAK ADA LAGI HASH GENERATOR. Hanya data demo yang jelas.

// Data demo yang disiapkan khusus (bisa ditambah)
const demoBrands = {
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
    aiSummary: "Sentimen turun karena keluhan pengiriman lambat. Saran: ganti kurir.",
    recommendations: [
      { priority: "TINGGI", action: "Ganti kurir", reason: "Keluhan pengiriman 42%" },
      { priority: "SEDANG", action: "Perbaiki kemasan", reason: "Keluhan kemasan 23%" },
      { priority: "RENDAH", action: "Tambah staf CS", reason: "Respon CS lambat 15%" },
    ],
    isDemo: true
  },
  "dior": {
    brand: "Dior",
    positive: 65, neutral: 20, negative: 15,
    trend: [
      { date: "14 Nov", day: "Sab", score: 80 },
      { date: "15 Nov", day: "Min", score: 82 },
      { date: "16 Nov", day: "Sen", score: 78 },
      { date: "17 Nov", day: "Sel", score: 79 },
      { date: "18 Nov", day: "Rab", score: 81 },
      { date: "19 Nov", day: "Kam", score: 83 },
      { date: "20 Nov", day: "Jum", score: 85 },
    ],
    topics: [
      { label: "Harga mahal", percent: 40 },
      { label: "Kualitas produk", percent: 20 },
    ],
    aiSummary: "Sentimen positif. Keluhan utama harga. Saran: komunikasikan nilai premium.",
    recommendations: [
      { priority: "TINGGI", action: "Kampanye nilai premium", reason: "Keluhan harga 40%" },
      { priority: "SEDANG", action: "Pertahankan kualitas", reason: "Kualitas dipuji" },
      { priority: "RENDAH", action: "Layanan purna jual", reason: "Tingkatkan loyalitas" },
    ],
    isDemo: true
  }
};

async function fetchBrandData(brandName) {
  const normalizedName = brandName.trim().toLowerCase();

  // 1. Cek apakah brand ada di data demo
  if (demoBrands[normalizedName]) {
    return demoBrands[normalizedName];
  }

  // 2. Jika tidak ada, kembalikan status "belum tersedia" (BUKAN DIKARANG)
  return {
    brand: brandName,
    isAvailable: false,
    message: "Brand ini belum tersedia dalam data demo. Di versi produksi, data akan diambil dari API Sosial Media (X, TikTok, Shopee)."
  };
}

module.exports = { fetchBrandData };