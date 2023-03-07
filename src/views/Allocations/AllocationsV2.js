import React, { useState, useEffect } from 'react'
import TrTest from '../../components/Table/TrTest';
import ThTable from '../../components/Table/ThTable';
import LinkAction from '../../components/LinkStyled/LinkAction'
import SelectList from '../../components/FormComponents/SelectList';

function  Allocations(props){


    const [setores, setSetores] = useState([])
    const [setorId, setSetorId] = useState([])
    const [employees, setEmployees] = useState([])
    const [keys, setKeys] = useState([])

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
              console.log(dados)       
                let setoresJson =JSON.stringify(dados)
                let pair = dados.map((setor) => ({value:setor.id, descricao: setor.acronym}))
                    setSetores(pair);
                    filterBySector();
            })
            .catch(error => console.log('error============:', error));
             }
        }, []);

    const filterBySector = setorId => {
      console.log(setorId)
      let token = localStorage.getItem('bearerToken');
          let url = setorId ? `http://localhost:8888/alocacoes/setor?id=${setorId}`: 'http://localhost:8888/funcionarios/setor';
          console.log("url ", url)
          fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
            'Authorization': token },
          })
          .then(resposta => resposta.json())
          .then(dados => {
              let summary = dados.map((employee) => ({id:employee.id, cpf:employee.cpf, nome:employee.firstName, email:employee.email, setor: employee.setor}))
              setEmployees(summary);
              console.log(dados[0])
              setKeys(dados.length ? Object.keys(summary[0]) : []);
          })
          .catch(error => console.log('error============:', error));      
     }

     const desalocar = employee => {
      if (window.confirm(`Tem certeza que deseja desalocar o ${employee.nome}"?`)) {
          let token = localStorage.getItem('bearerToken');
        fetch(`http://localhost:8888/alocacoes/${employee.cpf}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json',
          'Authorization': token },
        })
          .then(resposta => {
            if (resposta.ok) {
              setEmployees(employees.filter(x => x.id !== employee.id))
            }
          }).catch(error => console.log(error))
      }
   }

    return (
        <>
          <SelectList label="Lista de setores" defaultValue="Todos os setores" onChange={(setor) => filterBySector(setor)} list={setores}/>
          <table className="table table-hover">
          <ThTable theads={keys} />
          <tbody>
              {employees.map((employee, id )=> (
                  <tr key={id} className="table-active">
                    {keys.map((key, id) => (
                      <td key={id}>{employee[key]}</td>
                    ))}
                    <td>
                      <LinkAction className="btn btn-success" url={`alocacoes/alterar/${employee.id}` || ''}>
                        Alterar
                      </LinkAction>
                      <button className="btn btn-danger"onClick={() => desalocar(employee)}>Desalocar</button>
                    </td>
                  </tr>
              ))}
          </tbody>
          </table>
        </>
    )
}

export default Allocations