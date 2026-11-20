// lib/score.ts
// Rumus: (positif - negatif + 100) / 2 → skala 0-100.
// Dipakai di mana pun skor ditampilkan — angka tidak bisa meleset lagi.

export function hitungSkor(positive: number, negative: number): number {
  return Math.round((positive - negative + 100) / 2);
}

// Contoh: (53 - 25 + 100) / 2 = 64 ✅