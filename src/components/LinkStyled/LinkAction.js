import React from "react";
import { Link } from 'react-router-dom';

function LinkAction(props){
    return (
      <Link className={props.className} to={props.url}>{props.children}</Link>
    );
}

export default LinkAction