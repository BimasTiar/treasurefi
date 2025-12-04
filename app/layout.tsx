import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Pastikan tidak ada import komponen Client di sini jika tidak perlu

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
        {/* Pastikan tidak ada elemen aneh yang membungkus children */}
        {children} 
      </body>
    </html>
  );
}