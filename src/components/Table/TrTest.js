import React from 'react'
import LinkAction from '../LinkStyled/LinkAction'

function TrTest(props){
    //console.log(props)
    const keys = Object.keys(props.dados)

    return (
        <tr className="table-active">
            {keys.map((key, id) => (
            <td key={id}>{props.dados[key]}</td>
            ))}
            <td>
                <LinkAction className="btn btn-success" url={`${props.baseUrl}/alterar/${props.dados.id}` || ''}>
                    Alterar
                </LinkAction>
                <button className="btn btn-danger"onClick={props.remove}>Excluir</button>
            </td>
        </tr>
    )
}


export default TrTest