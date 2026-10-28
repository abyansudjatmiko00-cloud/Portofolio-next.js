import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Muhammad Abyan Sudjatmiko | Portotfolio",
  description: "Portofolio Muhammad Abyan Sudjatmiko, Siswa Calon Junior Web Developer di kelas Industri UBIG",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
       <body className="min-h-full flex flex-col bg-latar text-gray-800">
        {children}
        <Footer />
      </body>
    </html>
  );
}