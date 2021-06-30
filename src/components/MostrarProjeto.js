import React, { Component } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import IndexNavbar from "./Navbars/IndexNavbar";
import Button from "./Button.js";

class MostrarProjeto extends Component {
  render() {
    const { state } = this.props.location;
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
                  "https://grandeconsumo.com/wp-content/uploads/2017/11/upload18637_0-758x569.jpg"
                }
              />
              <Card.Body>
                <Card.Title id="tituloTeste">
                  <h4>{state}</h4>
                </Card.Title>
              </Card.Body>
            </Card>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withRouter(MostrarProjeto);
