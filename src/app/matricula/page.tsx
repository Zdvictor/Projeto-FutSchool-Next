"use client"
import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface Plan {
  id: 'iniciante' | 'avancado' | 'elite';
  name: string;
  price: string;
  features: string[];
  featured?: boolean;
}

// Função para normalizar strings (remover acentos e caracteres especiais)
const normalizeString = (str: string): string => {
  return str.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
};

// Schema de validação com Zod
const matriculaSchema = z.object({
  name: z.string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  email: z.string()
    .email('E-mail inválido'),
  phone: z.string()
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone deve estar no formato (99) 99999-9999'),
  plan: z.enum(['iniciante', 'avancado', 'elite'], {
    required_error: 'Selecione um plano',
  })
});

type FormData = z.infer<typeof matriculaSchema>;

function MatriculaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<FormData>({
    resolver: zodResolver(matriculaSchema),
    defaultValues: {
      plan: 'iniciante'
    }
  });

  // Pré-selecionar o plano baseado no parâmetro da URL
  useEffect(() => {
    const planoParam = searchParams.get('plano');
    if (planoParam) {
      const normalizedPlano = normalizeString(planoParam);
      const validPlans = ['iniciante', 'avancado', 'elite'];
      if (validPlans.includes(normalizedPlano)) {
        setValue('plan', normalizedPlano as FormData['plan']);
      }
    }
  }, [searchParams, setValue]);

  const plans: Plan[] = [
    {
      id: 'iniciante',
      name: "Iniciante",
      price: "299",
      features: [
        "2 treinos por semana",
        "Avaliação física mensal",
        "Uniforme básico",
        "Acesso à academia"
      ]
    },
    {
      id: 'avancado',
      name: "Avançado",
      price: "499",
      features: [
        "3 treinos por semana",
        "Avaliação física quinzenal",
        "Kit completo de uniforme",
        "Acesso à academia",
        "Acompanhamento nutricional"
      ],
      featured: true
    },
    {
      id: 'elite',
      name: "Elite",
      price: "799",
      features: [
        "5 treinos por semana",
        "Avaliação física semanal",
        "Kit completo premium",
        "Acesso total às instalações",
        "Acompanhamento nutricional",
        "Fisioterapia preventiva"
      ]
    }
  ];

  const onSubmit = async (data: FormData): Promise<void> => {
    setLoading(true);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const { sessionId } = await response.json();

      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error('Erro ao redirecionar para o checkout:', error);
        }
      }
    } catch (error) {
      console.error('Erro ao processar matrícula:', error);
    } finally {
      setLoading(false);
    }
  };

  // Função para formatar o telefone
  const formatPhone = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      const match = numbers.match(/^(\d{2})(\d{5})(\d{4})$/);
      if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
      }
    }
    return value;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
            Matrícula FutSchool
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Dados Pessoais */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-white">Dados Pessoais</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-white mb-2">Nome Completo</label>
                  <input
                    {...register('name')}
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    placeholder="Seu nome completo"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-white mb-2">E-mail</label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    placeholder="seu@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-white mb-2">Telefone</label>
                  <input
                    {...register('phone')}
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    placeholder="(99) 99999-9999"
                    onChange={(e) => {
                      e.target.value = formatPhone(e.target.value);
                    }}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Seleção de Plano */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-white">Escolha seu Plano</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <div key={plan.id} className={`relative ${watch('plan') === plan.id ? 'ring-2 ring-blue-500' : ''}`}>
                    <input
                      type="radio"
                      id={plan.id}
                      value={plan.id}
                      {...register('plan')}
                      className="sr-only"
                    />
                    <label
                      htmlFor={plan.id}
                      className={`block h-full p-6 rounded-xl cursor-pointer transition-all
                        ${watch('plan') === plan.id
                          ? 'bg-white/20'
                          : 'bg-white/10 hover:bg-white/15'
                        }
                        ${plan.featured ? 'border-2 border-yellow-400' : 'border border-white/20'}
                      `}
                    >
                      <div className="flex flex-col h-full">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                            <p className="text-2xl font-bold text-white mt-2">
                              R$ {plan.price}
                              <span className="text-sm font-normal">/mês</span>
                            </p>
                          </div>
                          {plan.featured && (
                            <span className="bg-yellow-400 text-black text-xs font-semibold px-2.5 py-1 rounded">
                              Mais Popular
                            </span>
                          )}
                        </div>
                        <ul className="space-y-3 flex-grow min-h-[280px]">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-start text-white">
                              <svg
                                className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
              {errors.plan && (
                <p className="mt-1 text-sm text-red-400">{errors.plan.message}</p>
              )}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className={`
                  px-8 py-4 rounded-xl text-lg font-semibold text-white
                  ${loading
                    ? 'bg-blue-600/50 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 transition-colors'
                  }
                `}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                    Processando...
                  </div>
                ) : (
                  'Finalizar Matrícula'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default function MatriculaPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-white">Carregando...</h2>
        </div>
      </div>
    }>
      <MatriculaContent />
    </Suspense>
  );
} 