import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://looplyn.studio"),
  title: "Looplyn — Where Brands Get Seen",
  description:
    "Looplyn helps ambitious brands scale through strategy, content, production and performance marketing. A premium growth studio.",
  keywords: [
    "marketing agency",
    "performance marketing",
    "brand strategy",
    "content creation",
    "growth studio",
    "Looplyn",
  ],
  openGraph: {
    title: "Looplyn — Where Brands Get Seen",
    description:
      "A premium growth studio for ambitious brands. Strategy, content, production and performance marketing.",
    type: "website",
    siteName: "Looplyn",
  },
  twitter: {
    card: "summary_large_image",
    title: "Looplyn — Where Brands Get Seen",
    description:
      "A premium growth studio for ambitious brands. Strategy, content, production and performance marketing.",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
