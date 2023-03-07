import React, { useState, useEffect } from 'react'

import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

function Initial(){
    console.log("login")
    return (

            <div className="container">                
                <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                <p className="lead">Sistema de gerenciamento de qualidade hospitalar.</p>
                <hr className="my-4"/>
                    <p className="lead">
                        <Link className="btn btn-primary btn-lg" to="/login" role="button">Logar</Link>
                        <Link className="btn btn-primary btn-lg" to="/adicionar" role="button">Cadastrar</Link>
                    </p>
                </div>  
            </div>
 
    )
}

export default Initial;
