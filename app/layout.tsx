import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://rajeshkumar.com"),
  title: {
    default: "Rajesh Kumar — India-China Business Consultant",
    template: "%s | Rajesh Kumar",
  },
  description:
    "Senior business consultant specializing in India-China market entry, cross-border trade, corporate strategy, and Chinese language expertise. Partner-level consulting for global enterprises.",
  keywords: [
    "India China business consultant",
    "market entry strategy",
    "cross-border trade",
    "Chinese language expert",
    "business delegation",
    "Rajesh Kumar consultant",
    "corporate consulting India",
    "China market entry",
  ],
  authors: [{ name: "Rajesh Kumar" }],
  creator: "Rajesh Kumar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL ?? "https://rajeshkumar.com",
    siteName: "Rajesh Kumar",
    title: "Rajesh Kumar — India-China Business Consultant",
    description:
      "Senior business consultant specializing in India-China market entry, cross-border trade, and corporate strategy.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rajesh Kumar — India-China Business Consultant",
    description: "Senior business consultant bridging India and China for global enterprises.",
    creator: "@rajeshkumar",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
