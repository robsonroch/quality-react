import React, { useState, useEffect } from 'react'
import TrTest from '../../components/Table/TrTest';
import ThTable from '../../components/Table/ThTable';
import LinkAction from '../../components/LinkStyled/LinkAction'

function  Employees(props){

    const [employees, setEmployees] = useState([])
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

                let employeesJson =JSON.stringify(dados)
                localStorage.setItem('employees', employeesJson);

                setEmployees(dados);
                console.log(dados[0])
                setKeys(dados.length ? Object.keys(dados[0]) : []);
            })
            .catch(error => console.log('error============:', error));
        }
    }, [])

    const removeEmploee = employee => {
        if (window.confirm(`Tem certeza que deseja remover "${employee.email} ${employee.firstName}"?`)) {
            let token = localStorage.getItem('bearerToken');
          fetch(`http://localhost:8888/employees/${employee.id}`, {
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
        <table className="table table-hover">
        <ThTable theads={keys} />
        <tbody>
            {employees.map((employee, id )=> (
                <TrTest baseUrl="/funcionarios" key={id} dados={employee} remove={() => removeEmploee(employee)}/>
            ))}
        </tbody>
        </table>
        <LinkAction className="btn btn-primary" url={"/funcionarios/novo"}>
            Novo
        </LinkAction>
        </>
    )
}

export default Employees