"use client";  // Necessário para que o componente funcione no lado do cliente em Next.js (App Router)

import { ChangeEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import * as EmailValidator from 'email-validator';

interface ModalProps {
  show: boolean;
  onHide: () => void;
  id: number;
}

function ModalBootstrap(props: ModalProps) {
  const [plan, setPlan] = useState<number>(props.id || 0);
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<Response | null>(null);

  const handleNotification = async (): Promise<void> => {
    setLoading(true);
    const validateEmail = EmailValidator.validate(email);

    if (validateEmail) {
      const isMailSent = await sendMail();
      setLoading(false);
      props.onHide();  // Fecha o modal

      if (isMailSent) {
        toast.success("Notificação enviada com sucesso!");
      } else {
        // Verifica o status 409 (email já cadastrado)
        if (status?.status === 409) {
          toast.error("Email já está recebendo novidades!");
        } else {
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
        body: JSON.stringify({ email, plan })
      });

      setStatus(response);  // Armazena o Response para verificar depois

      if (response.status === 409) {
        // Email já em uso, retorna false
        return false;
      }

      if (response.ok) {
        console.log("Email enviado com sucesso");
        return true;
      } else {
        console.log("Falha ao enviar o email");
        return false;
      }
    } catch (err) {
      console.error("Erro ao enviar o email:", err);
      return false;
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-center" id="contained-modal-title-vcenter">
          🚫 Vagas Esgotadas!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-left">
          Lamentamos informar que todas as vagas para os nossos planos foram preenchidas! 😔
        </p>
        <p className="text-left">
          Agradecemos imensamente pelo seu interesse em se juntar à FutSchool. Estamos comprometidos em oferecer uma experiência excepcional a todos os nossos alunos.
        </p>
        <p className="text-left">
          Neste momento, estamos trabalhando para aumentar nossa capacidade. Fique atento às nossas atualizações! 🔔 Em breve, novas oportunidades estarão disponíveis.
        </p>
        <p className="text-left">
          Não perca a chance de participar de:
          <ul style={{ listStyle: "disc", paddingLeft: "20px" }}>
            <li>Competições emocionantes ⚽️</li>
            <li>Treinos personalizados</li>
          </ul>
        </p>
        <p className="text-left">
          Para ser o primeiro a saber quando abrirmos novas vagas, preencha os campos abaixo e receba uma notificação! 📧✨
        </p>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Digite Seu Email:</label>
          <input 
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
            value={email} 
            type="email" 
            className="form-control mt-1" 
          />
          <select 
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setPlan(Number(e.target.value))} 
            value={plan} 
            className="form-control mt-3"
          >
            <option value="1">PLANO BASIC</option>
            <option value="2">PLANO ADVANCED</option>
            <option value="3">PLANO PREMIUM</option>
          </select>
          <Button onClick={handleNotification} className="mt-3">
            {!loading ? "ENVIAR" : <div className="spinner-border spinner-border-sm" role="status"></div>}
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  );
}

export default ModalBootstrap;
