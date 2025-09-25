import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

import { Providers } from "./providers";
import { Sidebar } from "@/components/ui/Sidebar";

export const metadata: Metadata = {
  title: "Estoque App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gray-100 flex">
            <Sidebar />
            <main className="w-full p-4 relative">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
