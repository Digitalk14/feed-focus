import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { redirect } from "next/navigation";
import { getUser, protectRoute } from "@/utils";
import { headers } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex h-screen bg-gray-50">{children}</div>
      </body>
    </html>
  );
}
