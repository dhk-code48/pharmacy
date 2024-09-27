import "leaflet/dist/leaflet.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import GeoLocationProvider from "@/providers/GeoLocationProvider";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { cn } from "@/lib/utils";
import { fontGeist, fontHeading, fontSans, fontUrban } from "@/assets/fonts";
import dynamic from "next/dynamic";

const SpeedInsights = dynamic(() => import("@vercel/speed-insights/next").then((mod) => mod.SpeedInsights), { ssr: false });
const Analytics = dynamic(() => import("@vercel/analytics/react").then((mod) => mod.Analytics), { ssr: false });

export const metadata: Metadata = {
  title: "Alpha Traders",
  description: "Multitenant Pharmacy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontUrban.variable,
          fontHeading.variable,
          fontGeist.variable
        )}
      >
        <SessionProvider>
          <GeoLocationProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <>{children}</>
              <Toaster richColors closeButton position="top-center" />
            </ThemeProvider>
          </GeoLocationProvider>
        </SessionProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
