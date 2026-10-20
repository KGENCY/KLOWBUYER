import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { SampleProvider } from "@/components/SampleBox";
import { RequestProvider } from "@/components/RequestBrand";
import { BuyerProvider } from "@/components/Buyer";
import Welcome from "@/components/Welcome";
import GlobalConversion from "@/components/conversion/GlobalConversion";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans" });
const mono = Geist_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "KLOW Wholesale — every K-beauty sample $7, no MOQ",
  description: "Sample any product from rising Korean beauty brands, one unit at $7. Five products ship free. Brands matched to your business.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        {/* The sample box reads the buyer's past orders (each product can be sampled once), so it sits inside. */}
        <BuyerProvider>
          <SampleProvider>
            <RequestProvider>
              <Header />
              <main>{children}</main>
              <Footer />
              <Welcome />
              <GlobalConversion />
            </RequestProvider>
          </SampleProvider>
        </BuyerProvider>
        <Reveal />
      </body>
    </html>
  );
}
