import React, { useState, useEffect } from 'react'
import TrTest from '../../components/Table/TrTest';
import ThTable from '../../components/Table/ThTable';
import LinkAction from '../../components/LinkStyled/LinkAction'

function  SetoresV2(props){

    const [setores, setSetores] = useState([])
    const [keys, setKeys] = useState([])

    useEffect(() => {
        let token = localStorage.getItem('bearerToken');

        if(token){
            fetch('http://localhost:8888/funcionarios', {
                method: 'get',
                headers: { 'Content-Type': 'application/json',
                            'Authorization': token }
            })
            .then(resposta => resposta.json())
            .then(dados => {

                let setoresJson =JSON.stringify(dados)
                localStorage.setItem('setores', setoresJson);

                setSetores(dados);
                setKeys(dados.length ? Object.keys(dados[0]) : []);
            })
            .catch(error => console.log('error============:', error));
        }
    }, [])

    const removeSetor = setor => {
        if (window.confirm(`Tem certeza que deseja remover "${setor.email} ${setor.firstName}"?`)) {
            let token = localStorage.getItem('bearerToken');
          fetch(`http://localhost:8888/setores/${setor.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json',
            'Authorization': token },
          })
            .then(resposta => {
              if (resposta.ok) {
                setSetores(setores.filter(x => x.id !== setor.id))
              }
            }).catch(error => console.log(error))
        }
     }

    return (
        <>
        <table className="table table-hover">
        <ThTable theads={keys} />
        <tbody>
            {employees.map((setor, id )=> (
                <TrTest baseUrl="/setores" key={id} dados={setor} remove={() => removeSetor(setor)}/>
            ))}
        </tbody>
        </table>
        <LinkAction className="btn btn-primary" url={"/setores/novo"}>
            Novo
        </LinkAction>
        </>
    )
}

export default SetoresV2