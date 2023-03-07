import React, { useEffect } from "react";

function RadioList(props) {
  return (
    <div className="form-group mt-2">
      <label>{props.label}</label>
      {props.list.map((option) => (
        <div className="form-check" key={option.value}>
          <input
            className="form-check-input"
            type="radio"
            name={props.name}
            value={option.value}
            defaultChecked={option.value === props.selectedOption}
            onChange={(event) => props.onChange(event.target.value)}
          />
          <label className="form-check-label">{option.description}</label>
        </div>
      ))}

      {props.isRequired ? (
        <small id="title" className="form-text text-muted">
          Obrigatório
        </small>
      ) : undefined}
    </div>
  );
}

export default RadioList;
