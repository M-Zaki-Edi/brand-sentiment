// backend/src/server.js
const express = require("express");
const cors = require("cors");
const { fetchBrandData } = require("./services/dataEngine");

const app = express();
app.use(cors({ origin: "https://brand-sentiment-xi.vercel.app" }));

app.get("/api/sentiment", async (req, res) => {
  const brandQuery = req.query.brand;
  if (!brandQuery) return res.status(400).json({ error: "Parameter brand wajib diisi" });

  try {
    const data = await fetchBrandData(brandQuery);
    if (data.isAvailable === false) {
      // Kirim 404 dengan pesan yang jelas (bukan data palsu)
      return res.status(404).json(data);
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan server" });
  }
});

app.get("/api/public/trends", (req, res) => {
  res.json([
    { brand: "Kopi Kita", trend: "turun", direction: "down" },
    { brand: "Teh Sejuk", trend: "naik", direction: "up" },
    { brand: "Roti Manis", trend: "naik", direction: "up" }
  ]);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API jalan di port ${PORT}`));