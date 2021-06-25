import React, { Component } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import IndexNavbar from "./Navbars/IndexNavbar";
import Button from "./Button.js";

class Projetos extends Component {
  constructor() {
    super();

    this.state = {
      dados: [],
    };
  }

  componentDidMount = () => {
    try {
      axios.get("http://localhost:8080/get_requesitos").then((response) => {
        this.setState({
          dados: response.data,
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { dados } = this.state;
    return (
      <div>
        <IndexNavbar />

        <div style={{ paddingTop: "75px" }}>
          <Button
            onClick={(event) => (window.location.href = "/AdicionarProjeto")}
            text="Adicionar Projeto"
          />

          <Grid container id="grid" spacing={3}>
            {dados.length > 0 ? (
              dados.map((el, index) => {
                return (
                  <Grid item xs={12} md={3} lg={3} key={index} id="grid2">
                    <Card style={{ width: "18rem" }} id="cardTeste">
                      <Card.Img
                        variant="top"
                        id="imageTeste"
                        src={
                          "https://grandeconsumo.com/wp-content/uploads/2017/11/upload18637_0-758x569.jpg"
                        }
                      />
                      <Card.Body>
                        <Card.Title id="tituloTeste">
                          <h4>{el.nomeProjeto}</h4>
                        </Card.Title>
                        <Card.Title id="tituloTeste">
                          <h4>{el.desc}</h4>
                        </Card.Title>
                        <Card.Title id="tituloTeste">
                          <h4>{el.prazo}</h4>
                        </Card.Title>
                        <Card.Title id="tituloTeste">
                          <h4>{el.categoria}</h4>
                        </Card.Title>

                        <br></br>

                        <br></br>
                      </Card.Body>
                    </Card>
                  </Grid>
                );
              })
            ) : (
              <div>Loading....</div>
            )}
          </Grid>
        </div>
      </div>
    );
  }
}

export default withRouter(Projetos);
