import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { SampleProvider } from "@/components/SampleBox";
import { RequestProvider } from "@/components/RequestBrand";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans" });
const mono = Geist_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "KLOW Wholesale — K-beauty samples at wholesale price, from 1 unit",
  description: "Sample any Korean beauty product from one unit at wholesale price. Five SKUs ship free. Brands matched to your business.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <SampleProvider>
          <RequestProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </RequestProvider>
        </SampleProvider>
        <Reveal />
      </body>
    </html>
  );
}
