import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Employee as template } from "../../components/templates";
import InputGroup from "../../components/FormComponents/InputGroup";

function EmployeeFormV2(props) {
  const history = useHistory();

  const { id } = useParams();

  let method = "POST";
  let fromStore = template;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");

  useEffect(()=>{
    let employees = JSON.parse(localStorage.getItem('employees'));
    if (employees) {
      if (id) {
        fromStore = employees?.find((employee) => employee.id == parseInt(id));
        method = "PUT";
      }
    }
    setFirstName(fromStore.firstName)
    setLastName(fromStore.lastName)
    setEmail(fromStore.email)
    setCpf(fromStore.cpf)
    setPassword(fromStore?.password)
  })

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let toSend = {id, firstName, lastName, email, cpf, password };
    let newOrUpdate = id
      ? "http://localhost:8888/funcionarios/" + id
      : "http://localhost:8888/funcionarios";
    let token = localStorage.getItem("bearerToken");
    console.log(toSend);
    fetch(newOrUpdate, {
      method: method,
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(toSend),
    })
      .then((resposta) => {
        if (resposta.ok) {
          history.push("/funcionarios");
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
        <legend>{id ? "Atualizar" : "Novo Setor"}</legend>
        <div className="form-group row"></div>
        <div className="form-group">
          <label htmlFor="firstName">Primeiro nome</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            defaultValue={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            placeholder="Primeiro nome somente"
          />
          <small id="firstName" className="form-text text-muted">
            Obrigatório
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Sobre nome</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            defaultValue={lastName}
            onChange={(event) => setLastName(event.target.value)}
            placeholder="Sobrenome"
          />
          <small id="lastName" className="form-text text-muted">
            Obrigatório
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="email">Endereço de e-mail</label>
          <input
            type="text"
            className="form-control"
            name="email"
            defaultValue={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-describedby="emailHelp"
          />
          <small id="email" className="form-text text-muted">
            Obrigatório
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="cpf">CPF</label>
          <input
            type="text"
            className="form-control"
            name="cpf"
            defaultValue={cpf}
            onChange={(event) => setCpf(event.target.value)}
            aria-describedby="emailHelp"
            placeholder="Somente números"
          />
          <small id="cpf" className="form-text text-muted">
            Obrigatório
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            defaultValue={password}
            onChange={(event) => setPassword(event.target.value)}
            id="password"
          />
          <small id="password" className="form-text text-muted">
            Obrigatório
          </small>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </fieldset>
    </form>
  );
}

export default EmployeeFormV2;
