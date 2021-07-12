import React, { Component } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import IndexNavbar from "./Navbars/IndexNavbar";
import GestorNavbar from "./Navbars/GestorNavbar";
import Button from "./Button.js";
import { Link } from "react-router-dom";
import { useState } from "react";
import { stringify } from "postcss";

class Projetos extends Component {
  constructor() {
    super();

    this.state = {
      dados: [],
      dados2: [],
      tipo: "",
    };
  }

  componentDidMount = () => {
    try {
      axios.get("http://localhost:8080/getProjetos").then((response) => {
        this.setState({
          dados: response.data,
        });
      });
    } catch (error) {
      console.error(error);
    }
    try {
      axios.get("http://localhost:8080/getProjetos").then((response) => {
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
    const { tipo } = this.state;
    const search = this.props.location.search; // returns the URL query String
    const params = new URLSearchParams(search);
    const utilizador = params.get("utilizador");

    axios.get("http://localhost:8080/getUsers").then((response) => {
      for (let utilizadores of response.data) {
        if (utilizadores.utilizador === utilizador) {
          this.setState({
            tipo: utilizadores.tipo,
          });
        }
      }
    });

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
        <IndexNavbar expression={utilizador}/>

        <h1 style={{paddingTop: "75px", fontSize: "30px", textAlign: "center", fontWeight: "bold"}}>Bem vindo {utilizador}</h1>

        <div style={{ padding: "20px", textAlign: "center", marginBottom:"20px"}}>
          <Button
            onClick={(event) => (window.location.href = `/AdicionarProjeto?utilizador=${utilizador}`)}
            text="Adicionar Projeto"
          />

          {console.log(utilizador)}
          {console.log(tipo)}

          <Grid container id="grid" spacing={3}>
            {dados.length > 0 ? (
              remove(dados, dados2).map((el, index) => {
                const newTo = {
                  pathname: "/MostrarProjeto",
                  param1: `${el.id}`,
                  param2: `${el.nomeProjeto}`,
                  param3: `${el.prazo}`,
                  param4: `${el.gestor}`,
                  param6: `${el.desc}`,
                  param7: `${el.equipa}`,
                  param8: `${utilizador}`,
                };

                return (
                  <Grid item xs={12} md={1} lg={2} key={index} id="grid2">
                    <Link to={newTo}>
                      <Card
                        style={{ width: "18rem", cursor: "pointer" }}
                        id="cardTeste"
                      >
                        <Card.Img
                          variant="top"
                          id="imageTeste"
                          src={
                            "https://icon-library.com/images/project-icon/project-icon-10.jpg"
                          }
                        />
                        <Card.Body>
                          <Card.Title id="tituloTeste">
                          <h1 style={{fontSize: "20px", textAlign: "center", fontWeight: "bold"}}>{el.nomeProjeto}</h1>
                          </Card.Title>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Grid>
                );
              })
            ) : (
              <div style={{margin: "Auto", paddingTop: "30px"}}>Não existem projetos a mostrar</div>
            )}
          </Grid>
        </div>
      </div>
    );
  }
}

export default withRouter(Projetos);
