import React, { useState, useEffect } from 'react'
import TrTable from '../../components/Table/TrTable';
import LinkAction from '../../components/LinkStyled/LinkAction'

function  Setores(props){

    const [setores, setSetores] = useState([])
  
    useEffect(() => {
        let token = localStorage.getItem('bearerToken');

        if(token){
            fetch('http://localhost:8888/setores', {
                method: 'get',
                headers: { 'Content-Type': 'application/json',
                            'Authorization': token }
            })            
            .then(resposta => resposta.json())
            .then(dados => {            
               let setores =dados.map((setor, id) => setor)
               let setoresJson =JSON.stringify(setores)
               localStorage.setItem('setores', setoresJson);

               setSetores(setores);
            })
            .catch(error => console.log('error============:', error));
        }
    }, [])

    const removerSetor = setor => {
        if (window.confirm(`Tem certeza que deseja remover "${setor.acronym} ${setor.name}"?`)) {
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
            }).catch(error => console.log*error)
        }
     }

    return (
        <>
        <table className="table table-hover">
        <thead>
            <tr>
                <th scope="col">id</th>
                <th scope="col">Sigla</th>
                <th scope="col">Descrição</th>
                <th scope="col">Ações</th>
            </tr>
        </thead>
        <tbody>
            {setores.map(setor => (
                <TrTable key={setor.id} url={"/setores/alterar/" + setor.id} remove={() => removerSetor(setor)}
                setor={setor}
            />
            ))}
        </tbody>
        </table>
        <LinkAction className="btn btn-primary" url={"/setores/novo"}>
            Novo
        </LinkAction>
        </>
    )
}

export default Setores