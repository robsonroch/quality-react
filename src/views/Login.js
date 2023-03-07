import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";

function Login(props) {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory();

  const onSubmitHandler = event => {
    event.preventDefault()

    const usuario = {email, password }
    
    fetch('http://localhost:8888/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario)
    })
    .then(resposta => {
            setEmail('')
            setPassword('')

         let bearerToken = resposta.headers.get('Authorization')
         localStorage.setItem('bearerToken', bearerToken)
         history.push('')
         window.location.reload()
     }).catch((error) => {alert("deu Ruim")})
  }

  return (
    <form onSubmit={onSubmitHandler}>
        <fieldset>
            <legend>Login</legend>
            <div className="form-group">
                <label htmlFor="email">Endereço de e-mail</label>
                <input 
                    type="text" className="form-control" 
                    name="email" 
                    value={email} 
                    onChange={event => setEmail(event.target.value)}
                    aria-describedby="emailHelp" placeholder="Email válido" />
                <small id="email" className="form-text text-muted">Obrigatório</small>
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
            <button type="submit" className="btn btn-primary">Entrar</button>
        </fieldset>
    </form>
  )
}

export default Login