import type { Metadata } from "next";
import localFont from "next/font/local";
import { Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/Header";
import { NextAuthProvider } from "@/src/lib/provider/NextAuthProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

// Nordic display face — Schibsted Grotesk is a Scandinavian newspaper typeface,
// grounding the headlines in Copenhagen rather than a generic serif.
const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-schibsted",
});

export const metadata: Metadata = {
  title: "Boknings kalendern Köpenhamn",
  description: "Besökskalendern i köpenhamn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${schibsted.variable}`}
      >
        <NextAuthProvider>
          <Header />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
