import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Buscar todos os planos
    const plans = await prisma.plan.findMany();
    
    // Buscar todos os usuários
    const users = await prisma.user.findMany();
    
    // Buscar todas as ordens
    const orders = await prisma.order.findMany();

    return NextResponse.json({
      message: 'Debug info',
      planos: {
        quantidade: plans.length,
        lista: plans
      },
      usuarios: {
        quantidade: users.length,
        lista: users
      },
      ordens: {
        quantidade: orders.length,
        lista: orders
      }
    });
  } catch (error) {
    console.error('Erro ao buscar informações:', error);
    return NextResponse.json(
      { 
        error: 'Erro ao buscar informações',
        detalhes: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
} 