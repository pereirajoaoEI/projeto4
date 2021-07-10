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
      dados2: [],
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
    try {
      axios.get("http://localhost:8080/getUsers").then((response) => {
        this.setState({
          dados2: response.data,
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { dados } = this.state;
    const { dados2 } = this.state;

    const remove = (array1, array2) => {
      for (var ar1 of array1) {
        for (var ar2 of array2) {
          if (ar1.id_antigo === ar2.id) {
            array2.splice(array2.indexOf(ar2), 1);
          }
        }
      }
      return array2;
    };
    return (
      <div>
        <IndexNavbar />

        <div style={{ paddingTop: "75px" }}>
          <Button
            onClick={(event) => (window.location.href = "/AdicionarUtilizador")}
            text="Adicionar Utilizador"
          />
          <Button
            onClick={(event) => (window.location.href = "/AdicionarCliente")}
            text="Adicionar Cliente"
          />

          <Grid container id="grid" spacing={3}>
            {remove(dados, dados2).map((el, index) => {
              const newTo = {
                pathname: "/MostrarUtilizador",
                param1: `${el.id}`,
                param2: `${el.id_antigo}`,
                param3: `${el.utilizador}`,
                param4: `${el.password}`,
                param5: `${el.nomeCompleto}`,
                param6: `${el.contacto}`,
                param7: `${el.tipo}`,
                param8: `${el.categoria}`,
              };

              return (
                <Grid item xs={12} md={3} lg={3} key={index} id="grid2">
                  <Link to={newTo}>
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
            })}
          </Grid>
        </div>
      </div>
    );
  }
}

export default withRouter(Utilizadores);
