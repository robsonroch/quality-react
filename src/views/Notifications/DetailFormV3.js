import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import SelectList from "../../components/FormComponents/SelectList";
import "react-datepicker/dist/react-datepicker.css";

function DetailForm(props) {
  const history = useHistory();

  const id = props.id;

  const [notificationData, setNotificationData] = useState({
    acronym: "",
    description: "",
    descriptionPublic: "",
    emailFromObserver: "",
    emailFromQuality: "",
    observationDate: "",
    resultClassification: "",
    title: "",
    id: null,
    sectorId: null,
    nonConformingType: "",
  });

  const colorMapping = {
    HUMAN_NON_CONFORMITY: "warning",
    PROCESS_NON_CONFORMING: "warning",
    TECHNICAL_NON_CONFORMING: "warning",
    IS_NOT_INCONFORMING: "success",
    NOT_RATED: "primary",
  };

  useEffect(() => {
    if (id) {
      fetchNotificacao(id);
    }
  }, []);

  const fetchNotificacao = (id) => {
    const token = localStorage.getItem("bearerToken");
    if (token) {
      fetch(`http://localhost:8888/notificacoes/${id}`, {
        method: "get",
        headers: { "Content-Type": "application/json", Authorization: token },
      })
        .then((resposta) => resposta.json())
        .then((dados) => {
          console.log(dados);
          setNotificationData({
            ...dados,
            observationDate: dados.observationDate.split("T")[0],
          });
        })
        .catch((error) => console.log("error============:", error));
    }
  };

  //todo REMOVER DEPOIS
  // const toggleAccordion = (input) => {
  //   const target = document.querySelector(input.dataset.target)
  //   input.classList.toggle("collapsed");
  //   target.classList.toggle("show");
  // };

  return (
    <div className="wrapper">
      <legend className="my-2">Detalhes da Notificação</legend>
      <div className="d-flex align-items-baseline mb-1 ms-0">
        <h6 className="m-1">Sigla do Setor:</h6>
        <p className="m-1">
          <b>{notificationData.acronym}</b>
        </p>
      </div>
      <div className="d-flex align-items-baseline mb-1 ms-0">
        <h6 className="m-1">Título:</h6>
        <p className="m-1">{notificationData.title}</p>
      </div>
      <div className="d-flex align-items-baseline mb-1 ms-0">
        <h6 className="m-1">Data da Observação:</h6>
        <p className="m-1">
          {notificationData.observationDate.length
            ? new Date(notificationData.observationDate)?.toLocaleDateString()
            : ""}
        </p>
      </div>
      <div className="d-flex align-items-baseline mb-1 ms-0">
        <h6 className="m-1">Email do Observador:</h6>
        <p className="m-1">{notificationData.emailFromObserver}</p>
      </div>
      <div className="d-flex align-items-baseline mb-1 ms-0">
        <h6 className="m-1">Email da Qualidade:</h6>
        <p className="m-1">{notificationData.emailFromQuality}</p>
      </div>
      <div className="d-flex flex-column mb-1 ms-0">
        <h6 className="m-1">Descrição:</h6>
        <textarea
          rows="3"
          disabled
          readOnly
          className="formControl m-1"
          value={notificationData.description || ""}
        />
      </div>
      <div className="d-flex flex-column mb-1 ms-0">
        <h6 className="m-1">Nota da Classificação:</h6>
        <textarea
          rows="3"
          disabled
          readOnly
          className="formControl m-1"
          value={notificationData.descriptionPublic || ""}
        />
      </div>
      <div className="d-flex align-items-baseline mb-1 ms-0">
        <h6 className="m-1">Resultado da classficação:</h6>
        <span
          className={`m-1 badge bg-${
            colorMapping[notificationData.nonConformingType] || "primary"
          }`}
        >
          {notificationData.resultClassification}
        </span>
      </div>

      {/* <div className="accordion">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              onClick={(event) => toggleAccordion(event.target)}
              type="button"
              data-target="#collapseOne"
            >
              Item #1
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse"
          >
            <div className="accordion-body">
              <strong>This is the first item's accordion body.</strong> It is
              shown by default, until the collapse plugin adds the appropriate
              classes that we use to style each element. These classes control
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default DetailForm;
