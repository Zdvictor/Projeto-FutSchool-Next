'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInitializePlans = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/seed');
      const data = await response.json();
      setMessage(data.message || 'Planos inicializados com sucesso!');
    } catch (error) {
      console.error('Erro ao inicializar planos:', error);
      setMessage('Erro ao inicializar planos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Painel Administrativo
          </h1>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Inicialização do Sistema
            </h2>
            <p className="text-gray-600">
              Clique no botão abaixo para inicializar os planos no banco de dados.
            </p>
            <button
              onClick={handleInitializePlans}
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Inicializando...' : 'Inicializar Planos'}
            </button>
            {message && (
              <p
                className={`mt-2 text-sm ${
                  message.includes('Erro')
                    ? 'text-red-600'
                    : 'text-green-600'
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 