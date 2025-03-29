import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const PLANS = {
  iniciante: {
    id: 'iniciante',
    price: 29900, // em centavos
    name: 'Plano Iniciante'
  },
  avancado: {
    id: 'avancado',
    price: 49900,
    name: 'Plano Avançado'
  },
  elite: {
    id: 'elite',
    price: 79900,
    name: 'Plano Elite'
  }
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, plan } = body;

    // Verificar se o plano existe
    const planInfo = PLANS[plan as keyof typeof PLANS];
    if (!planInfo) {
      return NextResponse.json(
        { error: 'Plano inválido' },
        { status: 400 }
      );
    }

    // 1. Criar ou atualizar usuário no banco
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        name,
        phone
      },
      create: {
        email,
        name,
        phone
      }
    });

    // 2. Criar sessão do Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: planInfo.name,
              description: `Matrícula FutSchool - ${planInfo.name}`,
            },
            unit_amount: planInfo.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/matricula`,
      customer_email: email,
      metadata: {
        userId: user.id,
        planId: planInfo.id,
      },
    });

    console.log("user id", user.id)
    console.log("plan id", planInfo.id)
    console.log("amount", planInfo.price)
    console.log("status", "pending")
    console.log("payment intent", session.payment_intent)
    // 3. Criar ordem no banco
    try {
      await prisma.order.create({
        data: {
          userId: user.id,
          planId: planInfo.id,
          amount: planInfo.price,
          status: 'pending',
          paymentIntent: session.id
        }
      });
    } catch (orderError) {
      console.error('Erro ao criar ordem:', orderError);
      throw orderError;
    }

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error);
    return NextResponse.json(
      { error: 'Erro ao processar o checkout' },
      { status: 500 }
    );
  }
} 