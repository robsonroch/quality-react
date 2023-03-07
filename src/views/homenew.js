import React, { useState, useEffect } from 'react'
import Navbar from '../components/navbar.js';

function HomeNew() {

    const [navLinks, setNavLinks] = useState([
        { url: "/", nome: "Home", id:"home" },
        { url: "/inicio", nome: "Início", id:"inicio" }
    ])
    const [emailUser, setEmailUser] = useState("")
    const [roleUser, setRoleUser] = useState("")
    
    useEffect(() => {
        let token = localStorage.getItem('bearerToken');
        if(token){
            fetch('http://localhost:8888/observers/permissions', {
                method: 'get',
                headers: { 'Content-Type': 'application/json',
                            'Authorization': token }
            })
            .then(resposta => resposta.json())
            .then(dados => {
               let feature = dados.featureAction
               let user = dados.email;
               let userRole = dados.perfil
               let newLinks = []

               for(const key in feature){
                let funcionalidade = feature[key]
                let nomeFuncionalidade = key;
                console.log(nomeFuncionalidade, funcionalidade.featureUrl);
                newLinks.push({ url: funcionalidade.featureUrl, nome: key, id: key})
                let perfil = dados.perfil;
                localStorage.setItem("perfil", perfil)
               }
               setNavLinks([...navLinks, ...newLinks]);
                console.log(user)
               setEmailUser(user)
               setRoleUser(userRole)
            })
            .catch(error => console.log('error============:', error));
        }
    }, [])

    return (
        <div className='container'>
          <Navbar user={emailUser} key="navBar" navLinks={navLinks} role={roleUser}/>
        </div>
      )
  }

export default HomeNew