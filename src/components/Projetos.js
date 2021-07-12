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
        <IndexNavbar />

        <h1 style={{paddingTop: "75px", fontSize: "30px"}}>Bem vindo {utilizador}</h1>

        <div style={{ paddingTop: "75px", textAlign: "center"}}>
          <Button
            onClick={(event) => (window.location.href = "/AdicionarProjeto")}
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
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Noun_Project_projects_icon_1327109_cc.svg/1024px-Noun_Project_projects_icon_1327109_cc.svg.png"
                          }
                        />
                        <Card.Body>
                          <Card.Title id="tituloTeste">
                            <h4>{el.nomeProjeto}</h4>
                          </Card.Title>
                          <Card.Title id="tituloTeste">
                            <h4>{el.desc}</h4>
                          </Card.Title>
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

export default withRouter(Projetos);
