import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://relinq.example"),
  title: "Relinq — One QR. Infinite destinations.",
  description:
    "Relinq gives every printed QR code a living destination. Update the link anytime without reprinting business cards, labels, menus, or packaging.",
  keywords: [
    "dynamic QR code",
    "editable QR code",
    "QR redirect",
    "QR infrastructure",
  ],
  openGraph: {
    title: "Relinq — One QR. Infinite destinations.",
    description:
      "Print one permanent QR code, then update where it points anytime from your dashboard.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body className="bg-bg font-sans text-ink antialiased">
        {children}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
