import type { Metadata } from "next";
import { Roboto } from 'next/font/google';
import "./globals.css";
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';
import ClientLayout from './ClientLayout';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "FutSchool - Formando Atletas de Elite",
  description: "Escola de futebol profissional com metodologia avançada",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={roboto.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
