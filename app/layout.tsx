import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://estejg.com"),
  title: "Esteban Guerra — AI builder",
  description:
    "I wire AI into products people actually use: calibrated prediction engines, MCP servers, lead-gen pipelines. B2B marketing and analytics background.",
  openGraph: {
    title: "Esteban Guerra — AI builder",
    description:
      "I wire AI into products people actually use: calibrated prediction engines, MCP servers, lead-gen pipelines.",
    url: "https://estejg.com",
    siteName: "Esteban Guerra",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${spaceMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
