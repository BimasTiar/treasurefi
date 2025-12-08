"use client";

import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { RainbowKitProvider, darkTheme, getDefaultConfig } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

// 1. Konfigurasi Wallet (Wagmi + RainbowKit)
// PENTING: Nanti ganti 'YOUR_PROJECT_ID' dengan ID gratis dari cloud.reown.com jika mau deploy serius.
// Untuk localhost, string acak saja tidak apa-apa.
const config = getDefaultConfig({
  appName: 'TreasureFi',
  projectId: 'YOUR_PROJECT_ID', 
  chains: [mainnet, sepolia], // Chain yang didukung
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  ssr: true, // Server Side Rendering support
});

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [mounted, setMounted] = useState(false);

  // Fix Hydration Error (Wajib untuk Next.js App Router)
  useEffect(() => setMounted(true), []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          theme={darkTheme({
            accentColor: '#FBBF24', // Warna Emas TreasureFi
            accentColorForeground: 'black',
            borderRadius: 'medium',
            fontStack: 'system',
            overlayBlur: 'small',
          })}
        >
          {mounted && children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}