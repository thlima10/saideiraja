import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MockStoreProvider } from "@/components/MockStoreProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Saideira J\u00e1",
  description: "Sua bebida em minutos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <MockStoreProvider>{children}</MockStoreProvider>
      </body>
    </html>
  );
}
