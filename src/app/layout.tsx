import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import GlobalErrorLogger from "@/components/GlobalErrorLogger";

export const metadata: Metadata = {
  title: 'Positionopedia',
  description: 'Explore a diverse range of sexual positions with detailed guides and insights.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Belleza&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <GlobalErrorLogger />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
