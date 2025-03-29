"use client"
import Image from "next/image";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from "next/link";     
import campo from '../../../public/campo.jpg'
import academia from '../../../public/academia.png'
import areaTreino from '../../../public/areaTreino.png'
import centroMedico from '../../../public/centroMedico.png'

export default function EstruturaPage() {
  const [ref1, inView1] = useInView({ threshold: 0.1, triggerOnce: true });
  const [ref2, inView2] = useInView({ threshold: 0.1, triggerOnce: true });

  const instalacoes = [
    {
      titulo: "Campo Oficial",
      descricao: "Campo com dimensões oficiais e grama natural de alta qualidade",
      imagem: campo
    },
    {
      titulo: "Academia",
      descricao: "Equipamentos modernos para preparação física completa",
      imagem: academia
    },
    {
      titulo: "Centro Médico",
      descricao: "Estrutura completa para atendimento e recuperação",
      imagem: centroMedico
    },
    {
      titulo: "Área de Treino Técnico",
      descricao: "Espaços dedicados para desenvolvimento técnico",
      imagem: areaTreino
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/quadra.jpg"
            alt="Estrutura FutSchool"
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
              Nossa Estrutura
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Instalações de primeira linha para seu desenvolvimento
            </p>
          </motion.div>
        </div>
      </section>

      {/* Instalações Section */}
      <section ref={ref1} className="py-24">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
          >
            Nossas Instalações
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {instalacoes.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group relative h-80 rounded-2xl overflow-hidden"
              >
                <Image
                  src={item.imagem}
                  alt={item.titulo}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{item.titulo}</h3>
                    <p className="text-gray-200">{item.descricao}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recursos Section */}
      <section ref={ref2} className="py-24 bg-white/5">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
          >
            Recursos Disponíveis
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: "⚽",
                title: "Equipamentos",
                items: ["Bolas oficiais", "Equipamentos de treino", "Tecnologia de análise", "GPS de performance"]
              },
              {
                icon: "🏥",
                title: "Saúde",
                items: ["Fisioterapia", "Nutrição", "Psicologia", "Departamento médico"]
              },
              {
                icon: "🎯",
                title: "Suporte",
                items: ["Vestiários modernos", "Área de descanso", "Refeitório", "Sala de vídeo"]
              }
            ].map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-white"
              >
                <div className="text-5xl mb-6">{resource.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{resource.title}</h3>
                <ul className="space-y-2">
                  {resource.items.map((item, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
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
              Conheça Nossa Estrutura
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Agende uma visita e conheça pessoalmente nossas instalações
            </p>
            <Link href="/matricula" className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
              Agendar Visita
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 