import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MIBA Awards Website",
  description:
    "Middle Belt Awards celebrates excellence, innovation, leadership, culture, entrepreneurship, and community impact across Africa."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
