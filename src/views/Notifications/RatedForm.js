import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import SelectList from "../../components/FormComponents/SelectList";
import RadioList from "../../components/FormComponents/RadioList";
import "react-datepicker/dist/react-datepicker.css";

function RatedForm(props) {
  const history = useHistory();

  const id = props.id

  let method = "POST";

  const [noticeId, setNoticeId] = useState("");
  const [solvedNoticeId, setSolvedNoticeId] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");
  const [proposedDeadline, setProposedDeadline] = useState("");
  const [definedDeadline, setDefinedDeadline] = useState("");
  const [actionSolutionRequests, setActionSolutionRequests] = useState("");

  /* -------------------------------------------------------------------------- */
  /*                            ALTERADOS POR PEDRO C                           */
  /* -------------------------------------------------------------------------- */
  const [recidivism, setRecidivism] = useState(false);
  const [qualityAssuranceOrigin, setQualityAssuranceOrigin] = useState("");
  const [nonConformingType, setNonConformingType] = useState("");
  const [sla, setSla] = useState("");
  const [descriptionInternal, setDescriptionInternal] = useState("");
  const [descriptionPublic, setDescriptionPublic] = useState("");

  const nonConformingTypeOptions = {
    HUMAN_NON_CONFORMITY: "Erro humano atendimento ou no procedimento",
    PROCESS_NON_CONFORMING:"Erro de processo no atendimento ou no procedimento",
    TECHNICAL_NON_CONFORMING: "Erro técnico no atendimento ou no procedimento",
    IS_NOT_INCONFORMING: "O fato relatado não é inconformidade",
    NOT_RATED: "A notificação ainda não classificada",
  };

  const slaOptions = {
    NO_URGENT: "Pode esperar",
    LITTLE_URGENT: "Pouco urgente",
    URGENT: "Urgente, merece atenção no curto prazo",
    VERY_URGENT: "Muito urgente",
    STRONG_URGENT: "Necessidade de ação imetiata",
  };

  // utility function para converter objetos de options em um array de {value:'',description:''}
  const mapToOptions = (obj) =>
    Object.entries(obj).map(([key, value]) => ({
      value: key,
      description: value,
    }));

  /* -------------------------------------------------------------------------- */
  const fetchRateNotice = (id) => {
    const token = localStorage.getItem("bearerToken");
    if (token) {
      fetch(`http://localhost:8888/resolucoes/${id}`, {
        method: "get",
        headers: { "Content-Type": "application/json", Authorization: token },
      })
        .then((resposta) => resposta.json())
        .then((dados) => {
          console.log(dados);
          setNoticeId(dados.noticeId);
          setSubmissionDate(dados.submissionDate);
          setProposedDeadline(dados.proposedDeadline);
          setDefinedDeadline(dados.definedDeadline);
          setSolvedNoticeId(dados.solvedNoticeId ?? undefined);
          setActionSolutionRequests(dados.actionSolutionRequests);
          /* -------------------------- ADICIONADO POR PEDRO -------------------------- */
          setQualityAssuranceOrigin(dados.qualityAssuranceOrigin);
          /* -------------------------------------------------------------------------- */
        })
        .catch((error) => console.log("error============:", error));
    }
  };

  const onSubmitHandlerSolved = (event) => {
    event.preventDefault();
    let toSend = {
      noticeId,
      solvedNoticeId,
      submissionDate,
      proposedDeadline,
      actionSolutionRequests,
    };
    console.log(toSend);
    //todo verificar o endpoint
    let method = "POST";
    let endpointURL = `http://localhost:8888/resolucoes`;
    if (id) {
      endpointURL = `http://localhost:8888/resolucoes/${id}`;
      method = "PUT";
    }

    let token = localStorage.getItem("bearerToken");
    fetch(endpointURL, {
      method: method,
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(toSend),
    })
      .then((resposta) => {
        if (resposta.ok) {
          history.push("/notificacoes");
        }
      })
      .catch(function (error) {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
      });
  };

  return (
    <form onSubmit={onSubmitHandlerSolved}>
      <fieldset>
        <legend>Avaliação da Notificação</legend>
        <div className="form-group mt-2">
          <label htmlFor="emailInput">Origem do controle de qualidade:</label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            value={qualityAssuranceOrigin}
            onChange={(event) => setQualityAssuranceOrigin(event.target.value)}
          />
        </div>
        <RadioList
          onChange={(value) => {setNonConformingType(value)}}
          selectedOption={nonConformingType}
          label="Tipo de não-conformidade:"
          list={mapToOptions(nonConformingTypeOptions)}
          name="nonConformingTypeRadioGroup"
        ></RadioList>
        <RadioList
          onChange={(value) => {setSla(value)}}
          selectedOption={sla}
          label="SLA:"
          list={mapToOptions(slaOptions)}
          name="slaRadioGroup"
        ></RadioList>
         <div className="form-group">
            <label htmlFor="exampleTextarea">Descrição Interna</label>
            <textarea
              className="form-control"
              id="descricao"
              name="descricao"
              value={descriptionInternal}
              onChange={(event) => setDescriptionInternal(event.target.value)}
              rows="5"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="exampleTextarea">Descrição Pública</label>
            <textarea
              className="form-control"
              id="descricao"
              name="descricao"
              value={descriptionPublic}
              onChange={(event) => setDescriptionPublic(event.target.value)}
              rows="5"
            ></textarea>
          </div>
      </fieldset>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default RatedForm;
