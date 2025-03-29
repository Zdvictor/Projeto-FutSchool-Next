"use client"
import Image from "next/image";
import "./index.css";
import {ChangeEvent, useState} from "react"
import { toast } from "react-toastify";
import Link from "next/link";
import * as EmailValidator from 'email-validator';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';
import campo from '../../public/campo.jpg'
import academia from '../../public/academia.png'
import areaTreino from '../../public/areaTreino.png'
import centroMedico from '../../public/centroMedico.png'

interface Banner {
  image: string;
  player: string;
}

interface Plan {
  id: 'iniciante' | 'avancado' | 'elite';
  name: string;
  price: string;
  features: string[];
  featured?: boolean;
}

interface Facility {
  title: string;
  description: string;
  image: any; // StaticImageData from next/image
}

interface MethodologyItem {
  icon: string;
  title: string;
  description: string;
}

const Home: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>("")
  const [status, setStatus] = useState<Response | null>(null)
  const [currentBanner, setCurrentBanner] = useState<string>("/neymar.jpg")

  const banners: Banner[] = [
    { image: "/neymar.jpg", player: "Neymar Jr" },
    { image: "/messi.png", player: "Lionel Messi" },
    { image: "/cr7.jpg", player: "Cristiano Ronaldo" }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const [ref1, inView1] = useInView({ threshold: 0.1, triggerOnce: true });
  const [ref2, inView2] = useInView({ threshold: 0.1, triggerOnce: true });
  const [ref3, inView3] = useInView({ threshold: 0.1, triggerOnce: true });

  const handleBannerChange = (image: string) => {
    setCurrentBanner(image);
  };

  const handleNotification = async (): Promise<void> => {
    setLoading(true);
    const validateEmail = EmailValidator.validate(email);
    
    if (validateEmail) {
      const isMailSent = await sendMail();
      
      setLoading(false);
      if (isMailSent) {
        toast.success("Notificação enviada com sucesso!");
      } else {
        if(status?.status === 409) {
          toast.error("Email Já Esta Recebendo Novidades!");
        }else {
          toast.error("Erro ao enviar o e-mail. Tente novamente mais tarde.");
        }
      }
    } else {
      setLoading(false);
      toast.error("E-mail inválido. Tente novamente.");
    }
  };

  const sendMail = async (): Promise<boolean> => {
    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      setStatus(response)
      if (response.ok) {
        console.log("Email enviado com sucesso");
        setEmail("")
        return true;
      } else {
        console.log("Falha ao enviar o email");
        setEmail("")
        return false;
      }
    } catch (err) {
      console.error("Erro ao enviar o email:", err);
      setEmail("")
      return false;
    }
  };

  const methodologyItems: MethodologyItem[] = [
    {
      icon: "⚽",
      title: "Desenvolvimento Técnico",
      description: "Aprimoramento das habilidades fundamentais com técnicas avançadas e treinos específicos"
    },
    {
      icon: "💪",
      title: "Preparação Física",
      description: "Programa personalizado de condicionamento físico para cada posição e nível"
    },
    {
      icon: "🎯",
      title: "Formação Tática",
      description: "Compreensão profunda das estratégias e sistemas do futebol moderno"
    }
  ];

  const facilities: Facility[] = [
    {
      title: "Campo Oficial",
      description: "Campo com dimensões oficiais e grama natural de alta qualidade",
      image: campo
    },
    {
      title: "Academia",
      description: "Equipamentos modernos para preparação física completa",
      image: academia
    },
    {
      title: "Área de Treino",
      description: "Espaço dedicado para aperfeiçoamento técnico individual",
      image: areaTreino
    },
    {
      title: "Centro Médico",
      description: "Acompanhamento médico e fisioterápico especializado",
      image: centroMedico
    }
  ];

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

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={currentBanner}
              alt="Campo de futebol"
              fill
              className="object-cover xl:object-fill brightness-50"
              priority
            />
          </motion.div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Forme-se um Atleta<br />Profissional
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-200 mb-8"
            >
              Desenvolva seu potencial com os melhores profissionais do futebol
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                href="/matricula"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 inline-block"
              >
                Comece Sua Jornada
              </Link>
            </motion.div>
          </div>

          {/* Jogadores Profissionais */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 flex justify-center items-center gap-8"
          >
            <div className="flex -space-x-4 md:-space-x-8">
              {banners.map((banner, index) => (
                <div
                  key={index}
                  className={`relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 ${
                    currentBanner === banner.image ? 'border-blue-400' : 'border-blue-600'
                  } shadow-xl transform hover:scale-110 transition-transform duration-300 z-${30 - index * 10} cursor-pointer`}
                  onClick={() => handleBannerChange(banner.image)}
                >
                  <Image
                    src={banner.image}
                    alt={banner.player}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="text-white text-center md:text-left">
              <p className="text-lg md:text-xl font-semibold mb-2">Inspirado pelos Melhores</p>
              <p className="text-sm md:text-base opacity-80">Treine como os maiores do futebol mundial</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metodologia Section */}
      <section ref={ref1} className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Nossa Metodologia</h2>
            <p className="text-xl text-gray-600">
              Treinamento personalizado baseado em ciência e experiência para formar atletas de alto nível
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {methodologyItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-5xl mb-6">{item.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Estrutura Section */}
      <section ref={ref2} className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Nossa Estrutura</h2>
            <p className="text-xl text-gray-600">
              Instalações de primeira linha para seu desenvolvimento completo
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {facilities.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group relative h-80 rounded-2xl overflow-hidden shadow-lg"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-200">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Planos Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Nossos Planos</h2>
            <p className="text-xl text-gray-600">
              Escolha o plano ideal para seu desenvolvimento
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`rounded-2xl overflow-hidden ${
                  plan.featured
                    ? "bg-blue-600 text-white transform scale-105 shadow-xl"
                    : "bg-white text-gray-900 border border-gray-200"
                }`}
              >
                <div className="p-8 flex flex-col h-full justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                    <div className="flex items-baseline mb-8">
                      <span className="text-4xl font-bold">R$</span>
                      <span className="text-6xl font-bold mx-1">{plan.price}</span>
                      <span className="text-xl">/mês</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <svg
                            className={`w-5 h-5 mr-3 ${
                              plan.featured ? "text-white" : "text-blue-600"
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
                  </div>
                  <div className="mt-auto flex justify-center">
                    <button
                      onClick={() => router.push(`/matricula?plano=${plan.id}`)}
                      className={`w-full max-w-[200px] py-4 px-8 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                        plan.featured
                          ? "bg-white text-blue-600 hover:bg-gray-100"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      Escolher Plano
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
