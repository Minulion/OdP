import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ode de Parfum (OdP)",
  description:
    "Transform Spotify and YouTube tracks into bespoke fragrance profiles with AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
