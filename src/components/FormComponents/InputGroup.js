import React from 'react'

function  InputGroup(props){

    return (    
     <>
        <label htmlFor={props.htmlFor}>{props.label}</label>
        <input 
            type="text" className="form-control" 
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            aria-describedby="emailHelp" placeholder={props.placeholder} />
        <small key={props.name} className="form-text text-muted">Obrigatório</small>
     </>
    )
}

export default InputGroup


