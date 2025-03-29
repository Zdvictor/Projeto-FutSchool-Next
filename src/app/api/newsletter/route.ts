import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Verificar se o email já está cadastrado
    const existingNewsletter = await prisma.newsletter.findUnique({
      where: { email }
    });

    if (existingNewsletter) {
      return NextResponse.json(
        { error: 'Email já está inscrito na newsletter' },
        { status: 400 }
      );
    }

    // Criar usuário se não existir
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name: email.split('@')[0], // Nome temporário baseado no email
        phone: '' // Campo obrigatório, mas vazio por enquanto
      }
    });

    // Criar inscrição na newsletter
    await prisma.newsletter.create({
      data: {
        email,
        userId: user.id,
        active: true
      }
    });

    // Enviar email de confirmação
    const mailOptions = {
      from: `"FutSchool" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '🎉 Bem-vindo à Newsletter da FutSchool!',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Bem-vindo à Newsletter da FutSchool</title>
          </head>
          <body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: Arial, sans-serif;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <tr>
                <td style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 40px 20px; text-align: center; border-radius: 16px 16px 0 0;">
                  <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Bem-vindo à Newsletter da FutSchool! ⚽</h1>
                </td>
              </tr>
              <tr>
                <td style="background-color: white; padding: 40px 30px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                    Olá! Estamos muito felizes em ter você em nossa lista de novidades! 🎉
                  </p>
                  
                  <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                    A partir de agora, você receberá:
                  </p>

                  <ul style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                    <li style="margin-bottom: 12px;">📢 Novidades sobre nossos programas de treinamento</li>
                    <li style="margin-bottom: 12px;">🏆 Histórias de sucesso dos nossos alunos</li>
                    <li style="margin-bottom: 12px;">💡 Dicas exclusivas de treinamento</li>
                    <li style="margin-bottom: 12px;">🎯 Ofertas especiais em primeira mão</li>
                  </ul>

                  <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 32px;">
                    Fique atento à sua caixa de entrada para não perder nenhuma novidade incrível!
                  </p>

                  <div style="text-align: center; margin-bottom: 32px;">
                    <a href="${process.env.NEXT_PUBLIC_BASE_URL}" 
                       style="display: inline-block; background-color: #2563eb; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold;">
                      Visitar FutSchool
                    </a>
                  </div>

                  <div style="border-top: 1px solid #e5e7eb; padding-top: 24px; text-align: center;">
                    <p style="color: #6b7280; font-size: 14px; margin: 0;">
                      Com gratidão,<br>
                      <strong style="color: #374151;">Equipe FutSchool</strong>
                    </p>
                  </div>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: 'Inscrição realizada com sucesso!'
    });
  } catch (error) {
    console.error('Erro ao processar inscrição:', error);
    return NextResponse.json(
      { error: 'Erro ao processar inscrição' },
      { status: 500 }
    );
  }
} 