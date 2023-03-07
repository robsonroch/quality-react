import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import NotificationFormV3 from "./NotificationFormV3";
import SolvedForm from "./SolvedForm";
import RatedForm from "./RatedForm";
import DetailFormV3 from "./DetailFormV3";

function NotificationFlow(props) {
  const history = useHistory();

  const { id } = useParams();
  const [noticeStatus, setNoticeStatus] = useState(undefined);

  useEffect(() => {
    if (id) {
      fetchNotificacao(id);
    }
  }, []);

  const fetchNotificacao = (id) => {
    const token = localStorage.getItem("bearerToken");
    if (token) {
      fetch(`http://localhost:8888/notificacoes/${id}`, {
        method: "get",
        headers: { "Content-Type": "application/json", Authorization: token },
      })
        .then((resposta) => resposta.json())
        .then((dados) => {
          setNoticeStatus(dados.noticeStatus)
          console.log(`✨✨✨ ${noticeStatus}`)
        })
        .catch((error) => console.log("error============:", error));
    }
  };

  const controlFlow = () =>{
    if(noticeStatus === undefined || noticeStatus === "CREATED") {
      return (<NotificationFormV3 id={id}/>)
    }
    if(noticeStatus && noticeStatus !== "CREATED"){

    }
  }

  const showForm = (noticeStatus === undefined || noticeStatus === "CREATED")
  const showDetail =  (noticeStatus && noticeStatus !== "CREATED")
  const showRatedForm = noticeStatus === 'RECEIVED'

  return (
    <>
      <div>{localStorage.getItem("perfil")}</div>
      {showForm ? <NotificationFormV3 id={id}/> : showDetail ? <DetailFormV3 id={id}/> : ''}
      { showRatedForm ? <RatedForm id={id}/> : ''}
    </>
  );
}

export default NotificationFlow;
