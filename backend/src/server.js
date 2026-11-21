// backend/src/server.js
const express = require("express");
const cors = require("cors");
const { brands, publicTrends } = require("./data/brands");

const app = express();

// Izinkan request dari domain frontend Vercel
app.use(cors({
  origin: "https://brand-sentiment-xi.vercel.app",
  methods: ["GET"]
}));

// GET /api/sentiment
app.get("/api/sentiment", (req, res) => {
  const key = (req.query.brand || "").trim().toLowerCase();
  const found = brands[key];
  if (!found) return res.status(404).json({ error: "Brand tidak ditemukan" });
  res.json(found);
});

// GET /api/public/trends
app.get("/api/public/trends", (req, res) => {
  res.json(publicTrends);
});

// Tambahkan route dasar untuk health check
app.get("/", (req, res) => {
  res.send("API SentimenBrand Jalan!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API jalan di port ${PORT}`));