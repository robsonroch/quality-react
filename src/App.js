import React, { Component } from "react";

import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import Initial from "./views/inicial";
import Login from "./views/Login";
import HomeNew from "./views/homenew";
import Setores from "./views/Setores/Setores";
import SetorForm from "./views/Setores/SetorForm";
import Employees from "./views/Employees/Employees";
import EmployeeFormV3 from "./views/Employees/EmployeeFormV3";
import Usuario from "./views/UsuarioNew";
import Allocations from "./views/Allocations/AllocationsV2";
import AllocationForm from "./views/Allocations/AllocationForm";
import Notifications from "./views/Notifications/Notifications";
import NotificationFlow from "./views/Notifications/NotificationFlow";
import DetailForm from "./views/Notifications/DetailForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anything: {},
    };

    this.changeObject = this.changeObject.bind(this);
  }

  changeObject(anything) {
    this.setState({ anything: anything });
  }

  render() {
    return (
      <>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"
          crossOrigin="anonymous"
        ></script>
        <Router>
          <HomeNew />
          <Switch>
            <Route path="/inicio">
              <div className="container">
                <Initial />
              </div>
            </Route>
            <Route exact path="/setores">
              <div className="container">
                <Setores changeObject={this.changeObject} />
              </div>
            </Route>
            <Route exact path="/setores/alterar/:id">
              <div className="container">
                <SetorForm setores={localStorage.getItem("setores")} />
              </div>
            </Route>
            <Route exact path="/setores/novo">
              <div className="container">
                <SetorForm />
              </div>
            </Route>
            <Route exact path="/funcionarios">
              <div className="container">
                <Employees changeObject={this.changeObject} />
              </div>
            </Route>
            <Route exact path="/funcionarios/alterar/:id">
              <div className="container">
                <EmployeeFormV3 />
              </div>
            </Route>
            <Route exact path="/funcionarios/novo">
              <div className="container">
                <EmployeeFormV3 />
              </div>
            </Route>
            <Route exact path="/alocacoes">
              <div className="container">
                <Allocations changeObject={this.changeObject} />
              </div>
            </Route>
            <Route exact path="/alocacoes/alterar/:id">
              <div className="container">
                <AllocationForm employees={localStorage.getItem("employees")} />
              </div>
            </Route>
            <Route exact path="/alocacoes/novo">
              <div className="container">
                <AllocationForm />
              </div>
            </Route>
            <Route exact path="/notificacoes">
              <div className="container">
                <Notifications changeObject={this.changeObject} />
              </div>
            </Route>
            <Route exact path="/notificacoes/alterar/:id">
              <div className="container">
                <NotificationFlow
                  employees={localStorage.getItem("employees")}
                />
              </div>
            </Route>
            <Route exact path="/notificacoes/novo">
              <div className="container">
                <NotificationFlow />
              </div>
            </Route>
            <Route exact path="/notificacoes/detalhar/:id">
              <div className="container">
                <DetailForm />
              </div>
            </Route>
            <Route path="/observers">
              <div className="container">
                <Usuario />
              </div>
            </Route>
            <Route path="/adicionar">
              <div className="container">
                <Usuario/>
              </div>
            </Route>
            <Route path="/login">
              <div className="container">
                <Login />
              </div>
            </Route>
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
