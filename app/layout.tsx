import "./globals.css";   
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "../components/sidebar";       
import AuthGuard from "../components/AuthGuard";
import { AuthProvider } from "../src/contexts/AuthContext";
import { Toaster } from "sonner";

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
        <AuthProvider>
          <AuthGuard>
            <div className="flex min-h-screen bg-[#09090b]">
              <Sidebar />

              <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen text-white">

                {children}
              </main>
            </div>
          </AuthGuard>

          {/* NOTIF TOAST */}
          <Toaster richColors closeButton />

        </AuthProvider>
      </body>
    </html>
  );
}