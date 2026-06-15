import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, IBM_Plex_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import { CartProvider } from "@/lib/cart-context";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});
const italic = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["italic"],
  variable: "--font-display-italic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VESPER® — Independent fashion studio",
  description:
    "VESPER is an independent studio building ten-year clothes from natural fibres. Designed in Brooklyn, made in small ateliers across Europe and Asia.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable} ${italic.variable}`}>
      <body className="font-sans bg-bg text-ink antialiased">
        <CartProvider>
          <LenisProvider>
            <Nav />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <CartDrawer />
          </LenisProvider>
        </CartProvider>
      </body>
    </html>
  );
}
