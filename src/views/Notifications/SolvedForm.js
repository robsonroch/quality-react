import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import SelectList from "../../components/FormComponents/SelectList";
import 'react-datepicker/dist/react-datepicker.css'

function SolvedForm(props) {
  const history = useHistory();

  const { id } = useParams();

  let method = "POST";

  const [noticeId, setNoticeId] = useState("");
  const [solvedNoticeId, setSolvedNoticeId] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");
  const [proposedDeadline, setProposedDeadline] = useState("");
  const [definedDeadline, setDefinedDeadline] = useState("");
  const [actionSolutionRequests, setActionSolutionRequests] = useState("");


  useEffect(() => {
    if (id) {
      fetchSolvedNotice(id);
    }
  }, []);

  const fetchSolvedNotice = (id) => {
    const token = localStorage.getItem("bearerToken");
    if (token) {
      fetch(`http://localhost:8888/resolucoes/${id}`, {
        method: "get",
        headers: { "Content-Type": "application/json", Authorization: token },
      })
        .then((resposta) => resposta.json())
        .then((dados) => {
          console.log(dados)
          setNoticeId(dados.noticeId);
          setSubmissionDate(dados.submissionDate);
          setProposedDeadline(dados.proposedDeadline);
          setDefinedDeadline(dados.definedDeadline);
          setSolvedNoticeId(dados.solvedNoticeId ?? undefined);
          setActionSolutionRequests(dados.actionSolutionRequests);
        })
        .catch((error) => console.log("error============:", error));
    }
  };

  const onSubmitHandlerSolved = (event) => {
    event.preventDefault();
    let toSend = {noticeId, solvedNoticeId, submissionDate, proposedDeadline, actionSolutionRequests};
    console.log(toSend)
    //todo verificar o endpoint
    let method = 'POST'
    let endpointURL = `http://localhost:8888/resolucoes`
    if(id){
      endpointURL = `http://localhost:8888/resolucoes/${id}`;
      method = 'PUT'
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
        <legend>{id ? "Alteração de Proposta de solução para conformidade hospitalar" : "Criação de Proposta de solução para conformidade hopistalar"}</legend>
        <div className="form-group">
          <label htmlFor="exampleTextarea">Data da ocorrência do fato</label>
          <DatePicker selected={submissionDate} onChange={(date) => setSubmissionDate(date)} />
          <small id="title" className="form-text text-muted">
            Obrigatório
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleTextarea">Data da ocorrência do fato</label>
          <DatePicker selected={proposedDeadline} onChange={(date) => setProposedDeadline(date)} />
          <small id="title" className="form-text text-muted">
            Obrigatório
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleTextarea">Data da ocorrência do fato</label>
          <DatePicker selected={definedDeadline} onChange={(date) => setDefinedDeadline(date)} />
          <small id="title" className="form-text text-muted">
            Obrigatório
          </small>
        </div>
      </fieldset>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default SolvedForm;
