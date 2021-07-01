import React, { Component } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import IndexNavbar from "./Navbars/IndexNavbar";
import Button from "./Button.js";
import { Link } from "react-router-dom";

class MostrarUtilizador extends Component {
  render() {
    const id = this.props.location.param1;
    const id_antigo = this.props.location.param2;
    const utilizador = this.props.location.param3;
    const password = this.props.location.param4;
    const nomeCompleto = this.props.location.param5;
    const contacto = this.props.location.param6;
    const tipo = this.props.location.param7;
    const categoria = this.props.location.param8;

    const newTo = {
      pathname: "/EditarUtilizador",
      param1: `${id}`,
      param2: `${id_antigo}`,
      param3: `${utilizador}`,
      param4: `${password}`,
      param5: `${nomeCompleto}`,
      param6: `${contacto}`,
      param7: `${tipo}`,
      param8: `${categoria}`,
    };
    return (
      <div>
        <IndexNavbar />

        <div style={{ paddingTop: "75px" }}>
          <Grid item xs={12} md={3} lg={3} id="grid2">
            <Card style={{ width: "18rem", cursor: "pointer" }} id="cardTeste">
              <Card.Img
                variant="top"
                id="imageTeste"
                src={
                  "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_960_720.png"
                }
              />
              <Card.Body>
                <Card.Title id="tituloTeste">
                  <h4>{nomeCompleto}</h4>
                </Card.Title>
                <Card.Title id="tituloTeste">
                  <h4>{utilizador}</h4>
                </Card.Title>
                <Card.Title id="tituloTeste">
                  <h4>{contacto}</h4>
                </Card.Title>
                <Card.Title id="tituloTeste">
                  <h4>{tipo}</h4>
                </Card.Title>
                <Card.Title id="tituloTeste">
                  <h4>{categoria}</h4>
                </Card.Title>
              </Card.Body>
            </Card>
            <Link to={newTo}>
              <Button text="Editar Utilizador" />
            </Link>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withRouter(MostrarUtilizador);
