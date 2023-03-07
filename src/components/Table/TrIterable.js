import React from 'react'
import LinkAction from '../LinkStyled/LinkAction'
import ThActions from './TdAction'

function TrItarable(props){
    //console.log(props)
    const keys = Object.keys(props.dados)

    return (
        <tr className="table-active">
            {keys.map((key, id) => (
            <td key={id}>{props.dados[key]}</td>
            ))}
            <ThActions></ThActions>
        </tr>
    )
}


export default TrItarable