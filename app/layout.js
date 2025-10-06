import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./_components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CPS Academy - Master Competitive Programming",
  description: "Join CPS Academy to excel in competitive programming with expert guidance, comprehensive courses, and a supportive community.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
