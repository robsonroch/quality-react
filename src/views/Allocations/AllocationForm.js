import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import InputGroup from "../../components/FormComponents/InputGroup";
import SelectList from "../../components/FormComponents/SelectList";

function AllocationsForm(props) {
  const history = useHistory();

  const { id } = useParams();

  let method = "POST";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [sectorId, setSectorId] = useState("");
  const [type, setType] = useState("");
  const [setorOptions, setSetorOptions] = useState([]);

  useEffect(() => {
    if (id) {
      fetchEmployee(id);
    }
    fetchOptions();
  }, []);

  const fetchEmployee = (id) => {
    const token = localStorage.getItem("bearerToken");
    if (token) {
      fetch(`http://localhost:8888/funcionarios/${id}`, {
        method: "get",
        headers: { "Content-Type": "application/json", Authorization: token },
      })
        .then((resposta) => resposta.json())
        .then((dados) => {
          setFirstName(dados.firstName);
          setLastName(dados.lastName);
          setEmail(dados.email);
          setCpf(dados.cpf);
          setSectorId(dados.sectorId ?? undefined);
          setPassword(dados?.password);
        })
        .catch((error) => console.log("error============:", error));
    }
  };

  const fetchOptions = () => {
    const token = localStorage.getItem("bearerToken");
    if (token) {
      fetch("http://localhost:8888/setores", {
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
    event.preventDefault();
    let toSend = { email, sectorId, type};

    //todo verificar o endpoint
    let endpointURL = "http://localhost:8888/alocacoes";

    let token = localStorage.getItem("bearerToken");
    fetch(endpointURL, {
      method: method,
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(toSend),
    })
      .then((resposta) => {
        if (resposta.ok) {
          history.push("/alocacoes");
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
        <legend>Alocação de Funcionário ao Setor</legend>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Nome Completo</label>
          <div className="col-sm-10">
            <input
              readOnly
              type="text"
              className="form-control-plaintext"
              value={`${firstName} ${lastName}`}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input
              readOnly
              type="text"
              className="form-control-plaintext"
              value={email}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">CPF</label>
          <div className="col-sm-10">
            <input
              readOnly
              type="text"
              className="form-control-plaintext"
              id="staticEmail"
              value={cpf}
            />
          </div>
        </div>
        <fieldset className="form-group">
          <legend>Tipo Alocação</legend>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="optionsRadios"
              value="QUALITY"
              onChange={(event) => setType(event.target.value)}
            />
            <label className="form-check-label">Qualidade</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="optionsRadios"
              value="BOSS"
              onChange={(event) => setType(event.target.value)}
            />
            <label className="form-check-label">Chefe de Setor</label>
          </div>
          <div className="form-check disabled">
            <input
              className="form-check-input"
              type="radio"
              name="optionsRadios"
              value="EMPLOYEE"
              onChange={(event) => setType(event.target.value)}
            />
            <label className="form-check-label">Funcionário</label>
          </div>
        </fieldset>
      </fieldset>
      <SelectList
        defaultValue="Selecione um setor"
        selectedOption={sectorId}
        onChange={(setor) => {
          setSectorId(parseInt(setor));
        }}
        label="Setores"
        list={setorOptions}
      ></SelectList>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default AllocationsForm;
