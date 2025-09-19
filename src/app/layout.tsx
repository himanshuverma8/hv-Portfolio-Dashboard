import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "./providers/QueryProvider";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "hv's links",
  description: "all my links",
  icons: {
    icon: "https://cdn.hv6.dev/images/logos/lighting_thunderbolt_red.jpg_circular.png?height=100&width=100",
    shortcut: "https://cdn.hv6.dev/images/logos/lighting_thunderbolt_red.jpg_circular.png?height=100&width=100",
    apple: "https://cdn.hv6.dev/images/logos/lighting_thunderbolt_red.jpg_circular.png?height=100&width=100",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* by default dark mode class added to root body  */}
      <body className="dark">
        {/* query provider is added to provide the react tanstack query to perisist and cache the fetched api data and reduce the loading time seamless updation of ui based on api changes */}
         <QueryProvider>
          <Toaster/>
          {children}
          
         </QueryProvider>
      </body>
    </html>
  );
}
