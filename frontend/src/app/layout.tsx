// src/app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import StyledComponentsRegistry from "../lib/registry";
import { Inter, Lora } from 'next/font/google';

// Configuração das fontes
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br" className={`${inter.variable}`}>
      <head>
        <title>Ensinai Blog</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}