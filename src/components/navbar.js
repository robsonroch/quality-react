import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  console.log(props.user);
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" key="navbarColor01">
          {props.user ? (
            <span style={{ padding: "8px" }}>
              <b>Usuário: </b>
              {props.user} {props.role}
            </span>
          ) : (
            ""
          )}
          <ul className="navbar-nav me-auto" key="navul">
            {props.navLinks.map((item) =>
              item.url ? (
                <li className="nav-item" key={item.id}>
                  <Link className="nav-link active" to={item.url}>
                    {item.nome}
                  </Link>
                </li>
              ) : (
                ""
              )
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
