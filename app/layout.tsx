import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar"; // Import Sidebar
import "./main.css"; // Pastikan nama file CSS Anda 'styles.css' atau sesuaikan
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TreasureFi",
  description: "Gamified Savings App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen bg-[#09090b] text-white">
            
            {/* Sidebar di Kiri */}
            <Sidebar />
            
            {/* Konten Utama di Kanan (Geser 64 unit / 256px) */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto">
              {children}
            </main>

          </div>
        </Providers>
      </body>
    </html>
  );
}