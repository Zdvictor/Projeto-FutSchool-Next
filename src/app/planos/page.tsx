"use client"
import { useRouter } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  label: string;
}

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  rating: number;
}

interface Plan {
  id: 'iniciante' | 'avancado' | 'elite';
  name: string;
  description: string;
  price: string;
  features: string[];
  featured?: boolean;
}

// Componente de contador animado melhorado
const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ end, duration = 2, label }) => {
  const [count, setCount] = useState<number>(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(countRef);

  useEffect(() => {
    if (inView) {
      let startTime: number | null = null;
      let animationFrame: number | null = null;

      const animate = (timestamp: number): void => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);

        if (progress < 1) {
          setCount(Math.floor(end * progress));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => {
        if (animationFrame) cancelAnimationFrame(animationFrame);
      };
    }
  }, [end, duration, inView]);

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300"
    >
      <div className="text-5xl font-bold text-white mb-4 flex items-center justify-center">
        <span>+</span>
        <span ref={countRef} className="mx-2">{count}</span>
      </div>
      <p className="text-blue-100 text-lg">{label}</p>
    </motion.div>
  );
};

// Componente de depoimento melhorado
const Testimonial: React.FC<TestimonialProps> = ({ name, role, content, rating }) => {
  // Gerar uma cor aleatória para o avatar
  const getRandomColor = (): string => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-red-500'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-xl overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white ${getRandomColor()} shadow-lg relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
            <span className="relative z-10">{name.charAt(0)}</span>
          </div>
          <div className="ml-4">
            <h4 className="font-semibold text-gray-900 text-lg">{name}</h4>
            <p className="text-gray-600">{role}</p>
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
        <div className="relative">
          <svg
            className="absolute top-0 left-0 w-8 h-8 text-blue-100 transform -translate-x-4 -translate-y-4 opacity-50"
            fill="currentColor"
            viewBox="0 0 32 32"
          >
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
          <p className="text-gray-700 mt-4 italic pl-6">{content}</p>
        </div>
      </div>
    </motion.div>
  );
};

const PlanosPage: React.FC = () => {
  const router = useRouter();

  const plans: Plan[] = [
    {
      id: 'iniciante',
      name: "Iniciante",
      description: "Ideal para quem está começando no futebol",
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
      description: "Para atletas que buscam evolução constante",
      price: "499",
      features: [
        "3 treinos por semana",
        "Avaliação física quinzenal",
        "Kit completo de uniforme",
        "Acompanhamento nutricional"
      ],
      featured: true
    },
    {
      id: 'elite',
      name: "Elite",
      description: "Programa completo para alto rendimento",
      price: "799",
      features: [
        "5 treinos por semana",
        "Avaliação física semanal",
        "Kit completo premium",
        "Fisioterapia preventiva"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-800">
      {/* Seção de Planos */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-white mb-4">
          Escolha seu Plano
        </h1>
        <p className="text-xl text-center text-blue-100 mb-12">
          Transforme seu potencial em realidade com nossa metodologia comprovada
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-2xl p-8 ${
                plan.featured
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-900"
              }`}
            >
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className={`text-sm mb-6 ${
                plan.featured ? "text-blue-100" : "text-gray-600"
              }`}>
                {plan.description}
              </p>
              <div className="flex items-baseline mb-8">
                <span className="text-3xl font-bold">R$</span>
                <span className="text-5xl font-bold mx-1">{plan.price}</span>
                <span>/mês</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg
                      className={`w-5 h-5 mr-2 ${
                        plan.featured ? "text-blue-200" : "text-blue-600"
                      }`}
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
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => router.push(`/matricula?plano=${plan.id}`)}
                className={`w-full py-4 rounded-full font-semibold transition-all duration-300 ${
                  plan.featured
                    ? "bg-white text-blue-600 hover:bg-gray-100"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Escolher Plano
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Seção de Contadores */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedCounter
              end={500}
              duration={2.5}
              label="Alunos Matriculados"
            />
            <AnimatedCounter
              end={50}
              duration={2}
              label="Professores Especializados"
            />
            <AnimatedCounter
              end={1000}
              duration={3}
              label="Atletas Formados"
            />
          </div>
        </div>
      </div>

      {/* Seção de Depoimentos */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              O que nossos alunos dizem
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Histórias reais de quem transformou seu sonho em realidade
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <Testimonial
              name="Pedro Silva"
              role="Aluno há 2 anos"
              content="A FutSchool mudou minha vida. A metodologia de treino é excepcional e os professores são muito dedicados. Hoje jogo em um time profissional graças ao treinamento que recebi aqui."
              rating={5}
            />
            <Testimonial
              name="Maria Santos"
              role="Aluna há 1 ano"
              content="Evolui muito desde que comecei. O acompanhamento individual faz toda diferença no desenvolvimento. Os treinos são desafiadores e divertidos ao mesmo tempo."
              rating={5}
            />
            <Testimonial
              name="João Costa"
              role="Aluno há 3 anos"
              content="Graças à FutSchool realizei meu sonho de me tornar jogador profissional. A estrutura é incrível e o suporte que recebemos vai além do campo."
              rating={5}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <Testimonial
              name="Lucas Oliveira"
              role="Aluno há 6 meses"
              content="Impressionante como minha técnica melhorou em tão pouco tempo. Os professores são muito atenciosos e sempre nos incentivam a dar o melhor."
              rating={4}
            />
            <Testimonial
              name="Ana Beatriz"
              role="Aluna há 1 ano e meio"
              content="O diferencial da FutSchool é o cuidado com cada detalhe do desenvolvimento do atleta. Desde a preparação física até o acompanhamento nutricional."
              rating={5}
            />
            <Testimonial
              name="Rafael Mendes"
              role="Aluno há 2 anos"
              content="Aqui não formam apenas jogadores, formam atletas completos. O suporte psicológico e a preparação mental fazem toda diferença."
              rating={5}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanosPage; 