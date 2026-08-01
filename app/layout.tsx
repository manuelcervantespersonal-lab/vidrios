import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Preloader } from "@/components/preloader/preloader";
import { CustomCursor } from "@/components/cursor/custom-cursor";
import { SmoothScrollProvider } from "@/components/scroll/smooth-scroll-provider";
import { PageTransitionProvider } from "@/components/transition/page-transition-context";
import { siteConfig } from "@/data/site";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.shortDescription}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.shortDescription,
  keywords: siteConfig.keywords,
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.shortDescription,
    images: [{ url: siteConfig.ogImage, width: 1920, height: 1080, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.shortDescription,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${oswald.variable} ${inter.variable} bg-background font-body text-foreground antialiased`}
      >
        <Preloader />
        <CustomCursor />
        <PageTransitionProvider>
          <SmoothScrollProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </PageTransitionProvider>
      </body>
    </html>
  );
}
