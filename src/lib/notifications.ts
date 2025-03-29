import nodemailer from 'nodemailer';

// Configuração do nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

interface NotificationData {
  userName: string;
  userEmail: string;
  planName: string;
  amount: number;
}

export async function sendEmailNotification({
  userName,
  userEmail,
  planName,
  amount,
}: NotificationData) {
  const mailOptions = {
    from: `"FutSchool" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: '🎉 Bem-vindo à FutSchool! Sua Matrícula foi Confirmada',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Matrícula Confirmada - FutSchool</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: Arial, sans-serif;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <tr>
              <td style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 40px 20px; text-align: center; border-radius: 16px 16px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Matrícula Confirmada! 🎉</h1>
              </td>
            </tr>
            <tr>
              <td style="background-color: white; padding: 40px 30px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                  Olá <strong>${userName}</strong>,
                </p>
                <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                  É com grande satisfação que confirmamos sua matrícula na FutSchool! Estamos muito felizes em ter você conosco.
                </p>
                
                <div style="background-color: #f3f4f6; padding: 24px; border-radius: 12px; margin-bottom: 32px;">
                  <h2 style="color: #1e40af; margin: 0 0 16px 0; font-size: 20px;">Detalhes da Matrícula</h2>
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 16px;">
                    <tr>
                      <td style="padding: 8px 0; color: #6b7280; width: 120px;">Plano:</td>
                      <td style="padding: 8px 0; color: #111827; font-weight: bold;">${planName}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #6b7280;">Valor:</td>
                      <td style="padding: 8px 0; color: #111827; font-weight: bold;">R$ ${(amount / 100).toFixed(2)}</td>
                    </tr>
                  </table>
                </div>

                <h3 style="color: #1e40af; font-size: 18px; margin-bottom: 16px;">Próximos Passos</h3>
                <ol style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 32px; padding-left: 24px;">
                  <li style="margin-bottom: 12px;">Nossa equipe entrará em contato em até 24 horas para agendar sua avaliação física inicial</li>
                  <li style="margin-bottom: 12px;">Prepare seus documentos pessoais (RG, CPF e atestado médico)</li>
                  <li style="margin-bottom: 12px;">Aguarde informações sobre sua primeira aula</li>
                </ol>

                <div style="background-color: #dbeafe; padding: 20px; border-radius: 12px; margin-bottom: 32px;">
                  <p style="color: #1e40af; font-size: 16px; line-height: 1.6; margin: 0;">
                    <strong>Dica:</strong> Para aproveitar ao máximo seu treinamento, recomendamos:
                  </p>
                  <ul style="color: #1e40af; margin: 16px 0 0 0; padding-left: 20px;">
                    <li>Trazer uma garrafa de água</li>
                    <li>Usar roupas confortáveis</li>
                    <li>Chegar 10 minutos antes do horário</li>
                  </ul>
                </div>

                <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 32px;">
                  Se tiver alguma dúvida, não hesite em nos contatar. Estamos aqui para ajudar!
                </p>

                <div style="text-align: center; margin-bottom: 32px;">
                  <a href="${process.env.NEXT_PUBLIC_BASE_URL}" 
                     style="display: inline-block; background-color: #2563eb; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold;">
                    Acessar Portal do Aluno
                  </a>
                </div>

                <div style="border-top: 1px solid #e5e7eb; padding-top: 24px; text-align: center;">
                  <p style="color: #6b7280; font-size: 14px; margin: 0;">
                    Atenciosamente,<br>
                    <strong style="color: #374151;">Equipe FutSchool</strong>
                  </p>
                </div>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email de confirmação enviado com sucesso');
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    throw error;
  }
} 