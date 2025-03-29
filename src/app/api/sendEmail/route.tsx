import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from 'next/server';
import {PrismaClient} from "@prisma/client"

interface email {

    email: string,
    plan: number

}

export async function POST(req: NextRequest) {
  const { email, plan }: email = await req.json();

  const prisma = new PrismaClient()

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {

        user: "victor.zaidir@gmail.com",
        pass: "ntbx jvjb zkdu zfcn"

    }

  });

  if(!plan) {

    const isEmailExist = await prisma.notificationEmail.findFirst({where: {email}})

    if(isEmailExist) {

      return NextResponse.json({error: "Email Já Esta Recebendo Novidades!"},  {status: 409})      
      
    }

    try {
      await transport.sendMail({
        from: "FutSchool <victor.zaidir@gmail.com>",
        to: email,
        subject: "Obrigado por se inscrever na Lista de Novidades! 🎉",
        html: `
            <!DOCTYPE html>
            <html lang="pt-BR">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Inscrição na Lista de Novidades</title>
              </head>
              <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 20px; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                  <h1 style="color: #4caf50; text-align: center;">🎉 Obrigado por se inscrever!</h1>
                  <p>Olá! 👋 <br />
                    Agradecemos por se inscrever na lista de novidades da FutSchool! ⚽️ Você receberá atualizações sobre novos planos, eventos e muito mais!
                  </p>
                  <p>Fique de olho no seu e-mail para não perder nenhuma novidade e aproveite todos os benefícios que temos a oferecer!
                  </p>
                  <div style="text-align: center; margin-top: 20px;">
                    <a href="#" style="display: inline-block; padding: 10px 20px; background-color: #4caf50; color: white; text-decoration: none; border-radius: 5px;">Acessar Site da FutSchool</a>
                  </div>
                  <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #777;">
                    <p>⚽️ FutSchool - Levando suas habilidades para o próximo nível!</p>
                  </div>
                </div>
              </body>
            </html>
        `
        
      });

      await prisma.notificationEmail.create({
        data: {
          email,
          plan: "newsletter"
        }
      })
      return NextResponse.json({ msg: "Email Enviado com Sucesso" }, { status: 200 });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: 'Erro ao enviar o e-mail.' }, { status: 500 });
    }

  }else {

  const isEmailExist = await prisma.plansEmail.findFirst({where: {email}})

  if(isEmailExist) {

    return NextResponse.json({error: "Email Já Esta Na Espera de Vagas!"},  {status: 409})      
    
  }

  let namePlan: string;
  let detailsPlan: string;

  

  if(plan === 1) {

    namePlan = 'Plano Basic'
    detailsPlan = 'Plano Basic , como competições trimestrais, treinos personalizados e sorteios de prêmios exclusivos! 🏅'

  }else if(plan === 2) {

    namePlan = 'Plano Advanced'
    detailsPlan = 'Plano Advanced como competições mensais, Treinos intensivos: Acesse 4 treinos semanais e Benefícios exclusivos '
    
  }else if(plan === 3) {

    namePlan = 'Plano Premium'
    detailsPlan = 'Plano Premium como competições quinzenais, treinos personalizados: Tenha 5 treinos semanais com acompanhamento técnico e físico e prêmios e vantagens: Concorra a viagens, equipamentos premium e acesso VIP em eventos esportivos.'

  }else {

    namePlan = ''
    detailsPlan = ''

  }
  

  try {
    await transport.sendMail({
      from: "FutSchool <victor.zaidir@gmail.com>",
      to: email,
      subject: "Obrigado por se inscrever! 🎉",
      html: `
          <!DOCTYPE html>
          <html lang="pt-BR">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Inscrição na Lista de Espera</title>
            </head>
            <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 20px; color: #333;">
              <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <h1 style="color: #4caf50; text-align: center;">🎉 Obrigado por se inscrever!</h1>
                <p>Olá! 👋 <br />
                  Agradecemos por se inscrever na lista de espera para o <strong>${namePlan}</strong> da FutSchool! ⚽️ Assim que novas vagas estiverem disponíveis, avisaremos você imediatamente.
                </p>
                <p>Fique de olho no seu e-mail para garantir sua vaga e aproveitar os benefícios incríveis do plano ${detailsPlan}
                </p>
                <div style="text-align: center; margin-top: 20px;">
                  <a href="#" style="display: inline-block; padding: 10px 20px; background-color: #4caf50; color: white; text-decoration: none; border-radius: 5px;">Acessar Site da FutSchool</a>
                </div>
                <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #777;">
                  <p>⚽️ FutSchool - Levando suas habilidades para o próximo nível!</p>
                </div>
              </div>
            </body>
          </html>
        `,
    });

    await prisma.plansEmail.create({
      data: {email, plan: String(plan)}
    })
    return NextResponse.json({ msg: "Email Enviado com Sucesso" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Erro ao enviar o e-mail.' }, { status: 500 });
  }
}
}
