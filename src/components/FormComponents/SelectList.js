import React from "react";

function SelectList(props) {
  console.log(props)
  return (

    <div className="form-group">
      <label htmlFor="exampleSelect1">{props.label}</label>
     
      <select onChange={event => props.onChange(event.target.value)} value={props.selectedOption} className="form-select" id="exampleSelect1">
      <option key={0} value="">{props.defaultValue}</option>
      {props.list.map((item, i) => (
          <option key={i} value={item.value}>{item.descricao}</option>
        ))}
      </select>
      {props.isRequired ?
      <small id="title" className="form-text text-muted">
        Obrigatório
      </small>
      : ""}
    </div>

  );
}

export default SelectList;