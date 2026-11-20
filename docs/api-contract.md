# Kontrak API — SentimenBrand
Versi: 2.0 (setelah F4) — ditambahkan `recommendations`, data per brand, tren bervariasi.

## GET /api/sentiment?brand={nama}

Mengembalikan analisis sentimen untuk satu brand.
Bentuk response **sama persis** dengan `dummyBrands` di `data/dummy.ts`.

### Response 200 (application/json)
{
  "brand": "Kopi Kita",
  "positive": 53,
  "neutral": 22,
  "negative": 25,
  "trend": [
    { "date": "14 Nov", "day": "Sab", "score": 78 },
    { "date": "15 Nov", "day": "Min", "score": 78 },
    { "date": "16 Nov", "day": "Sen", "score": 64 },
    { "date": "17 Nov", "day": "Sel", "score": 66 },
    { "date": "18 Nov", "day": "Rab", "score": 65 },
    { "date": "19 Nov", "day": "Kam", "score": 66 },
    { "date": "20 Nov", "day": "Jum", "score": 64 }
  ],
  "topics": [
    { "label": "Pengiriman lambat", "percent": 42 },
    { "label": "Kemasan rusak", "percent": 23 },
    { "label": "Respon CS lambat", "percent": 15 }
  ],
  "aiSummary": "Sentimen turun karena keluhan pengiriman lambat (42% ulasan negatif). Saran: ganti kurir & tampilkan estimasi waktu kirim.",
  "recommendations": [
    { "priority": "TINGGI", "action": "Ganti kurir pengiriman", "reason": "Keluhan pengiriman lambat 42%" },
    { "priority": "SEDANG", "action": "Perbaiki kemasan", "reason": "Keluhan kemasan rusak 23%" },
    { "priority": "RENDAH", "action": "Tambah staf CS", "reason": "Keluhan respon CS lambat 15%" }
  ]
}

### Response 404 (brand tidak ditemukan)
{ "error": "Brand tidak ditemukan" }

### Field wajib
| Field | Tipe | Keterangan |
|-------|------|------------|
| brand | string | Nama brand |
| positive | number (%) | Persentase ulasan positif |
| neutral | number (%) | Persentase ulasan netral |
| negative | number (%) | Persentase ulasan negatif |
| trend | array | 7 titik: date, day, score (0–100) |
| topics | array | label + percent (dari ulasan negatif) |
| aiSummary | string | Ringkasan + saran singkat dari AI |
| recommendations | array | **BARU**: priority (TINGGI/SEDANG/RENDAH), action, reason |

### Catatan
- Skor TIDAK dikirim backend — dihitung frontend via `lib/score.ts`
  agar satu sumber kebenaran: (positive - negative + 100) / 2.
- Persentase `topics.percent` dihitung **dari ulasan negatif**, bukan dari total.
- Semua field wajib ada. Frontend boleh pakai data dummy selama
  backend belum siap, dengan bentuk yang sama.
- Untuk halaman publik, endpoint tambahan: `GET /api/public/trends`
  → mengembalikan daftar `{ brand, trend: "naik" | "turun" }`.