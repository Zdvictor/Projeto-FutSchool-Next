import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';
import { sendEmailNotification } from '@/lib/notifications';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID não fornecido' },
        { status: 400 }
      );
    }

    // Verificar sessão no Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Pagamento não confirmado' },
        { status: 400 }
      );
    }

    // Buscar ordem pelo ID da sessão
    const order = await prisma.order.findUnique({
      where: {
        paymentIntent: sessionId
      },
      include: {
        user: true,
        plan: true
      }
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Ordem não encontrada' },
        { status: 404 }
      );
    }

    // Verificar se o pedido já foi processado para evitar duplicação
    if (order.status === 'completed') {
      return NextResponse.json({
        success: true,
        message: 'Pedido já foi processado anteriormente',
        order: order
      });
    }

    // Atualizar ordem no banco
    const updatedOrder = await prisma.order.update({
      where: {
        id: order.id
      },
      data: {
        status: 'completed'
      },
      include: {
        user: true,
        plan: true
      }
    });

    // Enviar email de confirmação apenas se o status anterior não era 'completed'
    if (order.status !== 'completed') {
      try {
        await sendEmailNotification({
          userName: order.user.name,
          userEmail: order.user.email,
          planName: order.plan.name,
          amount: order.amount
        });
      } catch (emailError) {
        console.error('Erro ao enviar email:', emailError);
        // Não vamos falhar a requisição se o email falhar
      }
    }

    return NextResponse.json({ 
      success: true,
      message: 'Pagamento confirmado com sucesso',
      order: updatedOrder
    });
  } catch (error) {
    console.error('Erro ao verificar pagamento:', error);
    return NextResponse.json(
      { error: 'Erro ao verificar pagamento' },
      { status: 500 }
    );
  }
} 