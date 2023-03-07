import React from 'react'
import LinkAction from '../LinkStyled/LinkAction'

function  TrTable(props){
    console.log(props)
    return (
        <tr className="table-active">

            <td scope="row">{props.setor.id}</td>
            <td>{props.setor.acronym}</td>
            <td>{props.setor.name}</td>
            <td>
                <LinkAction className="btn btn-success" url={props.url}>
                    Alterar
                </LinkAction>
                <button className="btn btn-danger"onClick={props.remove}>Excluir</button>

            </td>
        </tr>
    )
}

export default TrTable