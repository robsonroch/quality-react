import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Employee as template } from '../../components/templates'
import InputGroup from '../../components/FormComponents/InputGroup';

function EmployeeForm(props) {

  const history = useHistory();
  
  const { id } = useParams();

  let method = "POST";
  let fromStore = template

  if(id){
    let employees = JSON.parse(localStorage.getItem('employees'));
    fromStore = employees?.find(employee => (employee.id == parseInt(id)));
    console.log(fromStore)
    method = "PUT";
  }

  const [firstName, setFirstName] = useState(fromStore?.firstName)
  const [lastName, setLastName] = useState(fromStore?.lastName)
  const [email, setEmail] = useState(fromStore?.email)
  const [cpf, setCpf] = useState(fromStore?.cpf)
  const [password, setPassword] = useState("")

  const onSubmitHandler = event => {
    event.preventDefault()
    
    let toSend = {id, firstName, lastName, email, cpf, password};
    let newOrUpdate = id ? 'http://localhost:8888/funcionarios/' + id : 'http://localhost:8888/funcionarios';
    let token = localStorage.getItem('bearerToken');
    fetch(newOrUpdate, {
      method: method,
      headers: { 'Content-Type': 'application/json',
                            'Authorization': token },
      body: JSON.stringify(toSend)
    })
      .then(resposta => {
        if (resposta.ok) {
           
            history.push("/funcionarios"); 
        }
      }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
      });
  }

  return (
  <form onSubmit={onSubmitHandler}>
    <fieldset>
    <legend>{id ? "Atualizar" : "Novo Setor"}</legend>
        <div className="form-group row">
        </div>
        <div className="form-group">
            <label htmlFor="firstName">Primeiro nome</label>
            <input 
                type="text" className="form-control" 
                name="firstName" 
                value={firstName} 
                onChange={event => setFirstName(event.target.value)}
                placeholder="Primeiro nome somente" />
            <small id="firstName" className="form-text text-muted">Obrigatório</small>
        </div>
        <div className="form-group">
            <label htmlFor="lastName">Sobre nome</label>
            <input 
                type="text" className="form-control" 
                name="lastName" 
                value={lastName} 
                onChange={event => setLastName(event.target.value)}
                placeholder="Sobrenome" />
            <small id="lastName" className="form-text text-muted">Obrigatório</small>
        </div>
        <div className="form-group">
            <label htmlFor="email">Endereço de e-mail</label>
            <input 
                type="text" className="form-control" 
                name="email" 
                value={email} 
                onChange={event => setEmail(event.target.value)}
                aria-describedby="emailHelp"  />
            <small id="email" className="form-text text-muted">Obrigatório</small>
        </div>
        <div className="form-group">
            <label htmlFor="cpf">CPF</label>
            <input 
                type="text" className="form-control" 
                name="cpf" 
                value={cpf} 
                onChange={event => setCpf(event.target.value)}
                aria-describedby="emailHelp" placeholder="Somente números" />
            <small id="cpf" className="form-text text-muted">Obrigatório</small>
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
                type="password" 
                className="form-control" 
                name="password" 
                value={password} 
                onChange={event => setPassword(event.target.value)}
                id="password" placeholder="Password" />
            <small id="password" className="form-text text-muted">Obrigatório</small>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </fieldset>
  </form>
  )
}

export default EmployeeForm