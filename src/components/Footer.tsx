"use client"
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Inscrição realizada com sucesso!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Erro ao processar inscrição');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Erro ao processar inscrição');
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-1">
            <h2 className="text-2xl font-bold mb-4">FutSchool</h2>
            <p className="text-gray-400">
              Formando atletas de alto rendimento desde 2024. Nossa missão é desenvolver talentos e criar campeões.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/metodologia" className="text-gray-400 hover:text-white transition-colors">
                  Metodologia
                </Link>
              </li>
              <li>
                <Link href="/estrutura" className="text-gray-400 hover:text-white transition-colors">
                  Estrutura
                </Link>
              </li>
              <li>
                <Link href="/planos" className="text-gray-400 hover:text-white transition-colors">
                  Planos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                <span className="mr-2">📞</span> (11) 99999-9999
              </li>
              <li className="text-gray-400">
                <span className="mr-2">✉️</span> contato@futschool.com.br
              </li>
              <li className="text-gray-400">
                <span className="mr-2">📍</span> São Paulo, SP
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Receba novidades e atualizações sobre nossos programas
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu e-mail"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className={`w-full px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  status === 'loading'
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {status === 'loading' ? 'Processando...' : 'Inscrever-se'}
              </button>
              {message && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-sm ${
                    status === 'success' ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {message}
                </motion.p>
              )}
            </form>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © 2025 FutSchool. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
} 