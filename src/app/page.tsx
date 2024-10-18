"use client"
import Image from "next/image";
import "./index.css";
import {ChangeEvent, useState} from "react"
import { toast } from "react-toastify";
import Link from "next/link";
import * as EmailValidator from 'email-validator';



const Home: React.FC = () => {

  const [loading, setLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>("")
  const [status, setStatus] = useState<Response | null>(null)

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

  return (
    <>
      

      <div className="container-main">
        <section className="section-main">
          <article className="article-text">
            <h1>Promoção Incrível</h1>
            <p>
              Quer se tornar um grande jogador como esses 3 ? Venha para a
              FutSchool e torne-se um grande jogador com os melhores
              treinadores, equipes profissionais.
              <br />
              Dispute torneios de alto nível e torne-se um jogador renomado.{" "}
              <span>
                Assine um contrato agora mesmo e garanta benefícios exclusivos!
              </span>
            </p>

            <div className="article-text-values">
              <h2 style={{ color: "rgb(255, 5, 5)" }}>
                {" "}
                <del>DE R$ 799,99 (MENSAL)</del>{" "}
              </h2>
              <h2>POR APENAS</h2>
              <h2 style={{ color: "rgb(3, 182, 3)" }}>R$ 200,00 (MENSAL)</h2>

              <Link href="/price">
                <button>ADQUIRA AGORA MESMO</button>
              </Link>
            </div>
          </article>

          <article className="article-image">
            <Image
              width={1000}
              height={1000}
              objectFit="cover"
              style={{
                width: "120%",
                minWidth: "300px",
                height: "auto",
                marginTop: "-50px",
                marginLeft: "-60px",
              }}
              src="/capafut.png"
              alt="Capa Goats"
            />

            <div>
              <p>QUER RECEBER NOVIDADES ?</p>
              <input onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} value={email} type="text" placeholder="Digite Seu Email" />
              <button onClick={handleNotification}>{!loading ? "ENVIAR" : <div style={{margin: "0 auto"}} className="spinner"></div> } </button>
            </div>
          </article>
        </section>
      </div>

      <div className="container-about">
        <section className="section-about">
          <article className="article">
            <div className="article-text">
              <h2>Otimos Campos</h2>
              <p>
                Por isso somos os melhores! Na FutSchool, entendemos a
                importância de oferecer instalações de alta qualidade para o seu
                treino profissional de futebol. Nossos campos são cuidadosamente
                mantidos, proporcionando um ambiente propício para o
                aprimoramento das suas habilidades. Venha fazer parte da
                excelência em treinamento esportivo e alcance o seu máximo
                desempenho conosco.
              </p>
            </div>

            <div className="article-img">
              <Image
                width={1000}
                height={1000}
                objectFit="cover"
                style={{
                  width: "86%",
                  height: "auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "40px",
                  marginTop: "20px",
                }}
                src="/quadra.jpg"
                alt="Quadra"
              />
            </div>
          </article>
        </section>

        <hr />

        <section className="section-about">
          <article className="article">
            <div className="article-img">
              <Image
                width={1000}
                height={1000}
                objectFit="cover"
                style={{
                  width: "86%",
                  height: "auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "40px",
                  marginTop: "20px",
                }}
                src="/treino.jpg"
                alt="Treino"
              />
            </div>

            <div className="article-text">
              <h2 style={{ marginTop: "20px" }}>Melhores Treinos</h2>
              <p>
                Na FutSchool, comprometemo-nos a oferecer os melhores treinos
                para impulsionar o seu desempenho no futebol. Nossos programas
                são desenvolvidos por treinadores experientes e apaixonados,
                visando aprimorar não apenas suas habilidades técnicas, mas
                também sua resistência, estratégias de jogo e mentalidade
                esportiva.
              </p>
            </div>
          </article>
        </section>

        <hr />

        <section className="section-about">
          <article className="article">
            <div className="article-text">
              <h2>EstrelaBet</h2>
              <p>
                Orgulhosos da parceria com a EstrelaBet! Na FutSchool,
                oferecemos treinos de alta qualidade e vantagens exclusivas para
                nossos atletas, com apoio da EstrelaBet. Juntos, elevamos o
                futebol a um novo nível. Junte-se a nós e experimente a emoção
                do jogo com benefícios especiais!
              </p>
            </div>

            <div className="article-img">
              <Image
                width={1000}
                height={1000}
                objectFit="cover"
                style={{
                  width: "86%",
                  height: "auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "40px",
                  marginTop: "20px",
                }}
                src="/estrelabet.jpg"
                alt="Estrela Bet"
              />
            </div>
          </article>
        </section>
        
        <hr />
        
      </div>


    </>
  );
};

export default Home;
