import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-slate-50 text-slate-800 min-h-screen">
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b border-slate-200">
          <span className="font-bold text-xl text-blue-700 tracking-tight">SentimenBrand</span>
          <Link href="/publik" className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors">
            Laporan Publik
          </Link>
        </header>
        <main className="max-w-5xl mx-auto p-4 md:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}