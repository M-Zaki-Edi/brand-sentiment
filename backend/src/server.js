// backend/src/server.js
const express = require("express");
const cors = require("cors");
const { brands, publicTrends } = require("./data/brands");

const app = express();
app.use(cors()); // fungsinya: izinkan frontend (Vercel) memanggil API ini

// GET /api/sentiment?brand={nama} — sesuai kontrak v2.0
app.get("/api/sentiment", (req, res) => {
  const key = (req.query.brand || "").trim().toLowerCase();
  const found = brands[key];
  if (!found) return res.status(404).json({ error: "Brand tidak ditemukan" });
  res.json(found);
});

// GET /api/public/trends — sesuai kontrak v2.0
app.get("/api/public/trends", (req, res) => {
  res.json(publicTrends);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API jalan di port ${PORT}`));