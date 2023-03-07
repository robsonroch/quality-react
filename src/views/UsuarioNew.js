import React, { useState } from "react";

function Usuario() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const usuario = { firstName, lastName, email, password };

    fetch("http://localhost:8888/observers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    }).then((resposta) => {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      alert(JSON.stringify(resposta));
    });
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <fieldset>
        <legend>Cadastro</legend>
        <div className="form-group row"></div>
        <div className="form-group">
          <label htmlFor="firstName">Primeiro nome</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={firstName}
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
            value={lastName}
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
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-describedby="emailHelp"
            placeholder="Email válido"
          />
          <small id="email" className="form-text text-muted">
            Obrigatório
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            id="password"
            placeholder="Password"
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

export default Usuario;
