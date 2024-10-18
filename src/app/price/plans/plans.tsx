import { IPlan } from "../../interface/interface-plan"

const Plans: Array<IPlan> = [
    {
      id: 1,
      srcImg: "/plan1.png",
      altImg: "Imagem Plano Basic",
      namePlan: "Plano Basic",
      labelDetails: "Detalhes do Plano:",
      details: [
        "⚽️ Competições trimestrais: Teste suas habilidades em competições exclusivas da FutSchool.",
        "🏋️‍♂️ Treinos semanais: Acesse 3 treinos personalizados com foco técnico, tático e físico.",
        "🎁 Sorteios anuais: Concorra a prêmios como uniformes e equipamentos."
      ],
      oldValue: "R$ 199,99 (MENSAL)",
      newValue: "R$ 100,00 (MENSAL)"
    },
    {
      id: 2,
      srcImg: "/plan2.png",
      altImg: "Imagem Plano Advanced",
      namePlan: "Plano Advanced",
      labelDetails: "Detalhes do Plano:",
      details: [
        "🏆 Competições mensais: Participe de competições exclusivas para aprimorar suas habilidades.",
        "🔥 Treinos intensivos: Acesse 4 treinos semanais com foco avançado em técnica, tática e condicionamento físico.",
        "🎟️ Benefícios exclusivos: Receba descontos em equipamentos esportivos e eventos especiais."
      ],
      oldValue: "R$ 499,99 (MENSAL)",
      newValue: "R$ 150,00 (MENSAL)"
    },
    {
      id: 3,
      srcImg: "/plan3.png",
      altImg: "Imagem Plano Premium",
      namePlan: "Plano Premium",
      labelDetails: "Detalhes do Plano:",
      details: [
        "🥇 Competições quinzenais: Entre em competições de alto nível para desafiar seu desempenho.",
        "🏅 Treinos personalizados: Tenha 5 treinos semanais com acompanhamento técnico e físico.",
        "✈️ Prêmios e vantagens: Concorra a viagens, equipamentos premium e acesso VIP em eventos esportivos."
      ],
      oldValue: "R$ 799,99 (MENSAL)",
      newValue: "R$ 200,00 (MENSAL)"
    }
  ];
  
  export default Plans;
  


