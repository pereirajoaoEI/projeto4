import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts

import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";
import Projetos from "components/Projetos.js";
import AdicionarProjeto from "components/AdicionarProjeto.js";
import MostrarProjeto from "components/MostrarProjeto.js";
import Login from "components/Login.js";
import Utilizadores from "components/Utilizadores.js";
import AdicionarUtilizador from "components/AdicionarUtilizador.js";
import MostrarUtilizador from "components/MostrarUtilizador.js";
import EditarUtilizador from "components/EditarUtilizador.js";
import AdicionarRequisito from "components/AdicionarRequisito.js";
import EditarRequisito from "components/EditarRequisito.js";
import EditarProjeto from "components/EditarProjeto.js";
import DefinirEquipa from "components/DefinirEquipa.js";
import ProjetosUtilizador from "components/ProjetosUtilizador.js";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* add routes with layouts */}
      <Route path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />
      <Route path="/Projetos" component={Projetos} />
      <Route path="/AdicionarProjeto" component={AdicionarProjeto} />
      <Route path="/MostrarProjeto" component={MostrarProjeto} />
      <Route path="/Login" component={Login} />
      <Route path="/Utilizadores" component={Utilizadores} />
      <Route path="/AdicionarUtilizador" component={AdicionarUtilizador} />
      <Route path="/MostrarUtilizador" component={MostrarUtilizador} />
      <Route path="/EditarUtilizador" component={EditarUtilizador} />
      <Route path="/AdicionarRequisito" component={AdicionarRequisito} />
      <Route path="/EditarRequisito" component={EditarRequisito} />
      <Route path="/EditarProjeto" component={EditarProjeto} />
      <Route path="/DefinirEquipa" component={DefinirEquipa} />
      <Route path="/ProjetosUtilizador" component={ProjetosUtilizador} />
      {/* add routes without layouts */}
      <Route path="/landing" exact component={Landing} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/" exact component={Index} />
      {/* add redirect for first page */}
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
