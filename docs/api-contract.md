# Kontrak API — SentimenBrand

## GET /api/sentiment?brand={nama}

Mengembalikan analisis sentimen untuk satu brand.
Bentuk response **sama persis** dengan `data/dummy.ts` di frontend.

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
    { "date": "17 Nov", "day": "Sel", "score": 64 },
    { "date": "18 Nov", "day": "Rab", "score": 64 },
    { "date": "19 Nov", "day": "Kam", "score": 64 },
    { "date": "20 Nov", "day": "Jum", "score": 64 }
  ],
  "topics": [
    { "label": "Pengiriman lambat", "percent": 42 },
    { "label": "Kemasan rusak", "percent": 23 },
    { "label": "Respon CS lambat", "percent": 15 }
  ],
  "aiSummary": "Sentimen turun karena keluhan pengiriman lambat (42% ulasan negatif). Saran: ganti kurir & tampilkan estimasi waktu kirim."
}

### Response 404 (brand tidak ditemukan)
{ "error": "Brand tidak ditemukan" }

### Catatan
- Skor TIDAK dikirim backend — dihitung frontend via lib/score.ts
  agar satu sumber kebenaran: (positive - negative + 100) / 2.
- Semua field wajib ada. Frontend boleh pakai data dummy selama
  backend belum siap, dengan bentuk yang sama.