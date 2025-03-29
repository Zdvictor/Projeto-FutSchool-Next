"use client"
import Image from "next/image";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from "next/link";
export default function MetodologiaPage() {
  const [ref1, inView1] = useInView({ threshold: 0.1, triggerOnce: true });
  const [ref2, inView2] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/treino.jpg"
            alt="Treino de futebol"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Nossa Metodologia
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Desenvolvendo atletas de alto rendimento com ciência e experiência
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pilares Section */}
      <section ref={ref1} className="py-24">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
          >
            Pilares do Desenvolvimento
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Técnica Avançada",
                description: "Desenvolvimento de habilidades específicas com métodos inovadores",
                icon: "⚽"
              },
              {
                title: "Tática Inteligente",
                description: "Compreensão profunda do jogo e tomada de decisão",
                icon: "🧠"
              },
              {
                title: "Preparo Físico",
                description: "Condicionamento personalizado para alto rendimento",
                icon: "💪"
              },
              {
                title: "Mentalidade Vencedora",
                description: "Desenvolvimento psicológico para excelência",
                icon: "🎯"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-white text-center"
              >
                <div className="text-5xl mb-6">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Processo Section */}
      <section ref={ref2} className="py-24 bg-white/5">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
          >
            Nosso Processo
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Avaliação Inicial",
                description: "Análise completa das capacidades técnicas, físicas e táticas"
              },
              {
                step: "02",
                title: "Planejamento Personalizado",
                description: "Desenvolvimento de programa específico para cada atleta"
              },
              {
                step: "03",
                title: "Treinamento Intensivo",
                description: "Execução do programa com acompanhamento profissional"
              },
              {
                step: "04",
                title: "Avaliação Contínua",
                description: "Monitoramento constante e ajustes no programa"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView2 ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex items-center gap-8 mb-12"
              >
                <div className="text-6xl font-bold text-blue-500">{item.step}</div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="bg-blue-600 rounded-2xl p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Comece Sua Jornada
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Transforme seu potencial em realidade com nossa metodologia comprovada
            </p>
            <Link href="/matricula" className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
              Agende uma Avaliação
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 