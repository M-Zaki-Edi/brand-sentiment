// frontend/app/layout.tsx
import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      {/* Hapus class 'dark' jika ada. Biarkan body hanya pakai warna terang */}
      <body className="bg-slate-50 text-slate-800">
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
          <span className="font-semibold text-lg">SentimenBrand</span>
          <Link href="/publik" className="text-sm text-blue-600 hover:underline">
            Laporan Publik
          </Link>
        </header>
        <main className="max-w-5xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}