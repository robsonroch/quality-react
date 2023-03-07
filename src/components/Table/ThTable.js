import React from "react";
import LinkAction from "../LinkStyled/LinkAction";
import ThItem from "./ThItem";

function ThTable(props) {

  let ignoreKeys = props.ignoreKeys;
  if(ignoreKeys){
    ignoreKeys.forEach(ignore => {
      const index = props.theads.indexOf(ignore);
      console.log("index ", index, props.theads);
      props.theads.splice(index);
    });
  }

  return (
    <thead>
      <tr>
        {props.theads.map((thName, id) => (
          <ThItem key={id} theads={thName.toUpperCase()}></ThItem>
        ))}
        <th scope="col">Ações</th>
      </tr>
    </thead>
  );
}

export default ThTable;
