import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/components/sidebar"; 
import "./globals.css";
import AuthGuard from "@/components/AuthGuard";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TreasureFi",
  description: "Quest for Gold",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        <AuthGuard>
          <div className="flex min-h-screen bg-[#09090b]">
            <Sidebar />
            <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen text-white">
              {children}
            </main>
          </div>
        </AuthGuard>
      </body>
    </html>
  );
}