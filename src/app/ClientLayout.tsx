'use client'

import { ToastContainer } from 'react-toastify'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { routes } from './routes'
import Footer from '@/components/Footer'
interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-gray-50 antialiased">
        {children}
      </main>
      <ToastContainer position="top-right" />
      <Footer />
    </>
  )
} 