"use client";
import "./price.css";
import Image from "next/image";
import Plans from "./plans/plans";
import { IPlan } from "../interface/interface-plan";
import { useState } from "react";
import ModalBootstrap from "./modal/modal";

const Price: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const verifyDisponibility = (id: number) => {
    setLoading(true);
    setId(id);

    setTimeout(() => {
      setLoading(false);
      setOpenModal(true);
    }, 2000);
  };

  return (
    <section className="section-price">
      <div className="container-price">
        <h1>MELHORES PREÇOS</h1>

        <article className="boxs-price">
          {Plans.map((plan: IPlan) => (
            <div className="box-price" key={plan.id}>
              <Image
                width={1000}
                height={1000}
                objectFit="cover"
                style={{ width: "100%", height: "auto", background: "cover" }}
                src={plan.srcImg}
                alt={plan.altImg}
              />

              <h1>{plan.namePlan}</h1>

              <label>{plan.labelDetails}</label>

              <ul>
                {plan.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>

              <div className="area-value">
                <h4 className="underline">{plan.oldValue}</h4>
                <h4 className="success">{plan.newValue}</h4>
              </div>

              <button
                disabled={loading && id !== plan.id}
                onClick={() => verifyDisponibility(plan.id)}
              >
                {!loading ? (
                  "VERIFICAR DISPONIBILIDADE"
                ) : id === plan.id ? (
                  <div className="spinner"></div>
                ) : (
                  "VERIFICAR DISPONIBILIDADE"
                )}
              </button>
            </div>
          ))}
        </article>
      </div>

      {openModal && (
        <ModalBootstrap
          show={openModal}
          onHide={() => setOpenModal(false)}
          id={id}
        />
      )}
    </section>
  );
};

export default Price;
