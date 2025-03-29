import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const plans = await prisma.plan.findMany();
    return NextResponse.json({
      message: 'Planos encontrados',
      quantidade: plans.length,
      planos: plans
    });
  } catch (error) {
    console.error('Erro ao buscar planos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar planos' },
      { status: 500 }
    );
  }
} 