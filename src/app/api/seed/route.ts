import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PLANOS = [
  {
    id: 'iniciante',
    name: 'Plano Iniciante',
    description: 'Ideal para quem está começando',
    price: 29900,
    features: JSON.stringify([
      'Acesso básico às aulas',
      'Material didático digital',
      'Suporte por email'
    ]),
    duration: 'monthly'
  },
  {
    id: 'avancado',
    name: 'Plano Avançado',
    description: 'Para alunos que buscam mais recursos',
    price: 49900,
    features: JSON.stringify([
      'Todas as características do plano Iniciante',
      'Aulas ao vivo semanais',
      'Acesso a conteúdo exclusivo',
      'Suporte prioritário'
    ]),
    duration: 'monthly'
  },
  {
    id: 'elite',
    name: 'Plano Elite',
    description: 'A experiência completa de aprendizado',
    price: 79900,
    features: JSON.stringify([
      'Todas as características do plano Avançado',
      'Mentoria individual',
      'Acesso vitalício ao conteúdo',
      'Certificado de conclusão',
      'Suporte 24/7'
    ]),
    duration: 'monthly'
  }
];

export async function GET() {
  try {
    // Primeiro, vamos deletar todas as ordens existentes
    await prisma.order.deleteMany();

    // Depois, vamos deletar todos os planos existentes
    await prisma.plan.deleteMany();

    // Agora vamos criar os planos novamente
    const results = await Promise.all(
      PLANOS.map(plano =>
        prisma.plan.create({
          data: plano
        })
      )
    );

    // Vamos verificar se os planos foram criados
    const plansCheck = await prisma.plan.findMany();
    
    return NextResponse.json({
      message: 'Planos inicializados com sucesso',
      planosCriados: results,
      planosExistentes: plansCheck
    });
  } catch (error) {
    console.error('Erro ao inicializar planos:', error);
    return NextResponse.json(
      { 
        error: 'Erro ao inicializar planos',
        detalhes: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
} 