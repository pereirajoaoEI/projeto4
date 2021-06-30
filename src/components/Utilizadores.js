import React, { Component } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import IndexNavbar from "./Navbars/IndexNavbar";
import Button from "./Button.js";
import { Link } from "react-router-dom";

class Utilizadores extends Component {
  constructor() {
    super();

    this.state = {
      dados: [],
    };
  }

  componentDidMount = () => {
    try {
      axios.get("http://localhost:8080/getUsers").then((response) => {
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
            onClick={(event) => (window.location.href = "/AdicionarUtilizador")}
            text="Adicionar Utilizador"
          />

          <Grid container id="grid" spacing={3}>
            {dados.length > 0 ? (
              dados.map((el, index) => {
                return (
                  <Grid item xs={12} md={3} lg={3} key={index} id="grid2">
                    <Link
                      to={{
                        pathname: "/MostrarUtilizador",
                        state: el, // your data array of objects
                      }}
                    >
                      <Card
                        style={{ width: "18rem", cursor: "pointer" }}
                        id="cardTeste"
                      >
                        <Card.Img
                          variant="top"
                          id="imageTeste"
                          src={
                            "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_960_720.png"
                          }
                        />
                        <Card.Body>
                          <Card.Title id="tituloTeste">
                            <h4>{el.utilizador}</h4>
                          </Card.Title>
                          <Card.Title id="tituloTeste">
                            <h4>{el.nomeCompleto}</h4>
                          </Card.Title>
                          <Card.Title id="tituloTeste">
                            <h4>{el.contacto}</h4>
                          </Card.Title>
                          <Card.Title id="tituloTeste">
                            <h4>{el.tipo}</h4>
                          </Card.Title>

                          <br></br>

                          <br></br>
                        </Card.Body>
                      </Card>
                    </Link>
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

export default withRouter(Utilizadores);
