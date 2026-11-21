// backend/src/server.js
const express = require("express");
const cors = require("cors");
const { fetchBrandData } = require("./services/dataEngine");

const app = express();

// CORS diizinkan untuk domain Vercel
app.use(cors({
  origin: "https://brand-sentiment-xi.vercel.app",
  methods: ["GET"]
}));

// Endpoint dinamis: Menerima brand apapun
app.get("/api/sentiment", async (req, res) => {
  const brandQuery = req.query.brand;
  
  if (!brandQuery) {
    return res.status(400).json({ error: "Parameter brand wajib diisi" });
  }

  try {
    // Panggil Engine data
    const data = await fetchBrandData(brandQuery);
    res.json(data);
  } catch (error) {
    console.error("Engine Error:", error);
    res.status(500).json({ error: "Gagal menganalisis brand" });
  }
});

// Endpoint publik
app.get("/api/public/trends", (req, res) => {
  // Tetap pakai data statis untuk halaman publik
  res.json([
    { brand: "Kopi Kita", trend: "turun", direction: "down" },
    { brand: "Teh Sejuk", trend: "naik", direction: "up" },
    { brand: "Roti Manis", trend: "naik", direction: "up" }
  ]);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API jalan di port ${PORT}`));