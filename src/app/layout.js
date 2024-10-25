import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import Faqs from "@/components/Faqs";
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"></link>
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Rank2College",
  description: "Rank2College is a powerful college predictor tool specifically designed for JEE Main 2024 candidates. It uses user rank, category, domicile, and other preferences to filter eligible colleges from the official JoSAA 2024 data. With a streamlined UI and detailed results, it provides students with a reliable reference for college admissions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Faqs />
        <Footer />
      </body>

    </html>
  );
}
