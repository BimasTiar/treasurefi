import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/components/sidebar"; 
import "./globals.css";
import Providers from "./providers";
// 1. Import Toaster
import { Toaster } from "sonner";

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
          <div className="flex min-h-screen bg-[#09090b]">
            <Sidebar />
            
            <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen text-white">
              {children}
            </main>
          </div>
          
          {/* 2. Pasang Komponen Toaster di sini */}
          <Toaster 
            position="top-right" 
            theme="dark" 
            richColors 
            closeButton
          />
        </Providers>
      </body>
    </html>
  );
}