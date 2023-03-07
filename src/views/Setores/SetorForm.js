import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useHistory } from "react-router-dom";

function SetorForm(props) {

  let setor = {acronym: "", name: ""};
  const history = useHistory();
  
  const { id } = useParams();

  let method = "POST";

  if(id){
    console.log(id)
    let setores= JSON.parse(localStorage.getItem('setores'));
    setor = setores.find(setor => (setor.id == parseInt(id)));
    console.log(setor)
    method = "PUT";
  }

  const [acronym, setAcronym] = useState(setor.acronym)
  const [name, setName] = useState(setor.name)

  const onSubmitHandler = event => {
    event.preventDefault()

    let setor = {id, acronym, name}
    
    let newOrUpdate = id ? 'http://localhost:8888/setores/' + id : 'http://localhost:8888/setores';
    let token = localStorage.getItem('bearerToken');
    fetch(newOrUpdate, {
      method: method,
      headers: { 'Content-Type': 'application/json',
                            'Authorization': token },
      body: JSON.stringify(setor)
    })
      .then(resposta => {
        if (resposta.ok) {
            setAcronym('')
            setName('')
            history.push("/setores"); 
        }
      })
  }

  return (
    <form onSubmit={onSubmitHandler}>
        <fieldset>
            <legend>{id ? "Atualizar" : "Novo Setor"}</legend>
            <div className="form-group">
                <label htmlFor="acronym">Sigla</label>
                <input 
                    type="text" className="form-control" 
                    name="acronym" 
                    value={acronym} 
                    onChange={event => setAcronym(event.target.value)}
                    aria-describedby="emailHelp" placeholder="Deve ser único" />
                <small id="acronym" className="form-text text-muted">Obrigatório</small>
            </div>
            <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input 
                    type="text" 
                    className="form-control" 
                    name="name" 
                    value={name} 
                    onChange={event => setName(event.target.value)}
                    id="Nome" placeholder="Nome do Setor" />
                <small id="name" className="form-text text-muted">Obrigatório</small>
            </div>
            <button type="submit" className="btn btn-primary">Enviar</button>
        </fieldset>
    </form>
  )
}

export default SetorForm