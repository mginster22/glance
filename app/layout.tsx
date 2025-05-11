import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@/shared/components";
import { Toaster } from "react-hot-toast";

const roboto = Roboto({
  style: ["normal"],
  subsets: ["latin"],
  weight: ["100", "200", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "GLANCE",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className}  antialiased`}>
        <Header />
        <Toaster />

        {children}
      </body>
    </html>
  );
}
