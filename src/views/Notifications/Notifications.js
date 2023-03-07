import React, { useState, useEffect } from 'react'
import TrTest from '../../components/Table/TrTest';
import ThTable from '../../components/Table/ThTable';
import LinkAction from '../../components/LinkStyled/LinkAction'
import SelectList from '../../components/FormComponents/SelectList';

function  Notifications(props){


    const [notificacoes, setNotificacoes] = useState([])

    const [keys, setKeys] = useState([])

    const [summarys, setSummarys] = useState([])
    const [ignoreKeys, setIgnoreKeys] = useState([])

    useEffect(() => {
        let token = localStorage.getItem('bearerToken');

        if(token){
            fetch('http://localhost:8888/notificacoes/peruser', {
                method: 'get',
                headers: { 'Content-Type': 'application/json',
                            'Authorization': token }
            })
            .then(resposta => resposta.json())
            .then(dados => {
              console.log(dados)

               let summarys = dados.map((dados) => (
                {id:dados.id, titulo:dados.title,
                 sicla:dados.acronym, contato: dados.emailFromQuality,
                 status: dados.resultClassification,
                 stepNotification: dados.noticeStatus}))

                 setSummarys(summarys)

                setNotificacoes(dados);
                setKeys(summarys.length ? Object.keys(summarys[0]) : []);

            })
            .catch(error => console.log('error============:', error));
             }
        }, []);
    const makeTd = (summary, key, id) => {
      if(key !== "stepNotification"){
        return <td key={id}>{summary[key]}</td>
      } return ""};

    return (
        <>
          { summarys.length ?
          <table className="table table-hover">
          <ThTable theads={keys} ignoreKeys={["stepNotification"]} />
          <tbody>
              {summarys.map((summary, id )=> (
                  <tr key={id} className="table-active">
                    {keys.map((key, id) =>  makeTd(summary, key, id))}
                    <td>
                      <LinkAction className="btn btn-primary" url={`notificacoes/detalhar/${summary.id}` || ''}>
                          Detalhar
                      </LinkAction>
                      <LinkAction className="btn btn-success" url={`notificacoes/alterar/${summary.id}` || ''}>
                        {summary.stepNotification == "CREATED" ? "Alterar" : "Acompanhar"}
                      </LinkAction>
                      <button className="btn btn-danger"onClick={() => setNotificacoes(summary)}>Excluir</button>
                    </td>
                  </tr>
              ))}
          </tbody>
          </table> : <div>Não há notificacos</div>}
          <div className="jumbotron">
            <hr className="my-4"/>
          </div>
          <LinkAction className="btn btn-primary" url={"/notificacoes/novo"}>
            Novo
          </LinkAction>
        </>
    )
}

export default Notifications