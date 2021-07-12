import React, { Component } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import GestorNavbar from "./Navbars/GestorNavbar";
import Button from "./Button.js";
import { Link } from "react-router-dom";

class MostrarProjetosUtilizador extends Component {
  constructor() {
    super();

    this.state = {
      dados: [],
      dados2: [],
    };
  }

  componentDidMount = () => {
    try {
      axios.get("http://localhost:8080/getRequisitos").then((response) => {
        this.setState({
          dados: response.data,
        });
      });
    } catch (error) {
      console.error(error);
    }
    try {
      axios.get("http://localhost:8080/getRequisitos").then((response) => {
        this.setState({
          dados2: response.data,
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    //const { state } = this.props.location;
    const id = this.props.location.param1;
    const nomeProjeto = this.props.location.param2;
    const prazo = this.props.location.param3;
    const gestor = this.props.location.param4;
    const cliente = this.props.location.param5;
    const descricao = this.props.location.param6;
    const equipa = this.props.location.param7;
    const utilizador = this.props.location.param8;
    const tipo = this.props.location.param9;
    const { dados } = this.state;
    const { dados2 } = this.state;

    const newTo2 = {
      pathname: "/AdicionarRequisito",
      param1: `${id}`,
      param2: `${utilizador}`,
    };

    const newTo4 = {
      pathname: "/DefinirEquipa",
      param1: `${id}`,
      param2: `${nomeProjeto}`,
      param3: `${prazo}`,
      param4: `${gestor}`,
      param6: `${descricao}`,
      param7: `${equipa}`,
      param8: `${utilizador}`,
    };

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
        <GestorNavbar expression={utilizador} />

        <div style={{ paddingTop: "75px" }}>
          <div style={{ textAlign: "center"}}>
            <div
              style={{
                border: "1px solid black",
                display: "inline-block",
                width: "50%",
              }}
            >
              <h1
                style={{
                  fontSize: "22.5px",
                }}
              >
                Detalhes do Projeto:
              </h1>
              <b> Descrição: </b> {descricao}
              <br></br>
              <b> Prazo: </b> {prazo}
              <br></br>
              <b>Gestor:</b> {gestor}
              <br></br>
            </div>

            {/* EDITAR REQUiSITOS */}

            <div
              style={{
                border: "1px solid black",
                display: "inline-block",
                verticalAlign: "middle",
                width: "50%",
              }}
            >
              <h1
                style={{
                  fontSize: "22.5px",
                }}
              >
                Requisitos do Projeto:
              </h1>

              <Link to={newTo2}>
                <Button text="Adicionar Requisito" />
              </Link> 

              {dados.length > 0 ? (
                remove(dados, dados2).map((el, index) => {
                  const newTo = {
                    pathname: "/EditarRequisito",
                    param1: `${el.id}`,
                    param2: `${el.descricao}`,
                    param3: `${el.prioridade}`,
                    param4: `${el.projeto}`,
                    param5: `${utilizador}`,
                    param6: `${el.cliente}`,
                    param7: `${el.estado}`,
                  };

                  if (id == el.projeto) {
                    return (
                      <div style={{borderRadius: "50px", border:" 1px solid black", padding:"10px"}}>
                        <b>Stakeholder: </b>
                        {el.cliente}
                        <br></br>
                        <b>Autor: </b>
                        {el.utilizador}
                        <br></br>
                        <b>Estado: </b>
                        {el.estado}
                        <br></br> 
                        <div>
                          {el.descricao}
                          <Link paddinfleft="5px" to={newTo}>
                            <i class="fas fa-edit"></i>
                          </Link>
                        </div>
                      </div>
                    );
                  }
                })
              ) : (
                <div>Nao existem requisitos a mostrar</div>
              )}
            </div>

          </div>

          {/* Equipa */}

          <div
            style={{
              width: "50%",
              //border: "1px solid black",
              textAlign: "center",
            }}
          >
            {gestor === utilizador ? (
              <Link to={newTo4}>
                <Button text="Definir Equipa" />
              </Link>
            ) : (
              <div> </div>
            )}

            <Table responsive>
              <thead>
                <tr>
                  <th>Developer</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{equipa}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(MostrarProjetosUtilizador);
