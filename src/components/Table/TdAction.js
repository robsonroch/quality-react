import React from 'react'
import LinkAction from '../LinkStyled/LinkAction'

function  ThActions(props){
    console.log(props.listParam)
    console.log(props.button)
    return (    
        <td>

            {props.listParam.map((item, i) => (
                <LinkAction className="btn btn-primary" key={i} url={item.url}>{item.label}</LinkAction>
            ))}
            <button className="btn btn-danger"onClick={props.button.action}>{props.button}</button>
        </td>

    )
}

export default ThActions