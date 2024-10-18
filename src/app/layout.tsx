import type { Metadata } from "next";
import localFont from "next/font/local";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "FutSchool: A Melhor Escolha para Treinos de Futebol",
  description: "Na FutSchool, oferecemos os melhores programas de treinamento para aprimorar suas habilidades no futebol. Com profissionais experientes e metodologias inovadoras, ajudamos atletas de todas as idades a alcançar seu máximo potencial. Venha fazer parte da melhor escola de treino e dê o primeiro passo rumo ao sucesso no esporte!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ToastContainer autoClose={2000}/>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
