import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import SelectList from "../../components/FormComponents/SelectList";
import 'react-datepicker/dist/react-datepicker.css'
import SolvedForm from "./SolvedForm";

function NotificationForm(props) {
  const history = useHistory();

  const { id } = useParams();

  let method = "POST";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [observationDate, setObservationDate] = useState("");
  const [sectorId, setSectorId] = useState("");
  const [setorOptions, setSetorOptions] = useState([]);

  useEffect(() => {
    if (id) {
      fetchNotificacao(id);
    }
    fetchOptions();
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
          console.log(dados)
          setTitle(dados.title);
          setDescription(dados.description);
          setSectorId(dados.sectorId ?? undefined);
          console.log(dados.observationDate)
          console.log(dados.observationDate.split("T")[0])
          setObservationDate(new Date(dados.observationDate.split("T")[0]))
        })
        .catch((error) => console.log("error============:", error));
    }
  };

  const fetchOptions = () => {
    const token = localStorage.getItem("bearerToken");
    if (token) {
      fetch("http://localhost:8888/setores/qualidade", {
        method: "get",
        headers: { "Content-Type": "application/json", Authorization: token },
      })
        .then((resposta) => resposta.json())
        .then((dados) => {
          const selectOptions = dados.map((setor) => ({
            value: setor.id,
            descricao: setor.acronym,
          }));

          setSetorOptions(selectOptions);
        })
        .catch((error) => console.log("error============:", error));
    }
  };

  const onSubmitHandler = (event) => {
    console.log(event.target);
    event.preventDefault();
    let toSend = {id, title, description, observationDate, sectorId};
    console.log(toSend)
    //todo verificar o endpoint
    let method = 'POST'
    let endpointURL = `http://localhost:8888/notificacoes`
    if(id){
      endpointURL = `http://localhost:8888/notificacoes/${id}`;
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
    <form onSubmit={onSubmitHandler}>
      <fieldset>
        <legend>{id ? "Alteração de Notificação de não conformidade hospitalar" : "Criação de Notificação de não conformidade hopistalar"}</legend>
        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Breve descrição"
          />
          <small id="title" className="form-text text-muted">
            Obrigatório
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleTextarea">Descrição do fato observado</label>
          <textarea
            className="form-control"
            id="descricao"
            name="descricao"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows="5">
          </textarea>
        </div>
        <SelectList
          isRequired={true}
          selectedOption={sectorId}
          onChange={(setor) => {
            setSectorId(parseInt(setor));
          }}
          label="Setor"
          list={setorOptions}
          >
        </SelectList>
        <div className="form-group">
          <label htmlFor="exampleTextarea">Data da ocorrência do fato</label>
          <DatePicker selected={observationDate} onChange={(date) => setObservationDate(date)} />
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

export default NotificationForm;
