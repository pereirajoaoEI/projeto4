import React, { Component } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import IndexNavbar from "./Navbars/IndexNavbar";
import Button from "./Button.js";
import { Link } from "react-router-dom";

class MostrarProjeto extends Component {
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
        <IndexNavbar expression={utilizador}/>
        <div
          style={{
            paddingTop: "75px",
            paddingRight: "16px",
            paddingLeft: "16px",
            paddingBottom: "16px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                //border: "1px solid black",
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
              <br></br>
              <img
                src="https://icon-library.com/images/project-icon/project-icon-10.jpg"
                alt="Imagem"
                style={{
                  width: "125px",
                  height: "125px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              ></img>
              <b> Titulo: </b> {nomeProjeto}
              <br></br>
              <b> Descrição: </b> {descricao}
              <br></br>
              <b> Prazo: </b> {prazo}
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <h1
                style={{
                  fontSize: "22.5px",
                }}
              >
                Equipa Responsável:
              </h1>
              <br></br>
              <img
                src="https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331257_960_720.png"
                alt="Imagem"
                style={{
                  width: "125px",
                  height: "125px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              ></img>
              <b> Gestor: </b> {gestor}
              <br></br>
              <b> Equipa: </b> {equipa}
              <br></br>
              {/* <Link to={newTo4}>
                <Button text="Definir Equipa" />
              </Link> */}
              {/* <Table responsive>
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
            </Table>  */}
            </div>

            {/* EDITAR REQUiSITOS */}

            <div
              style={{
                //borderLeft: "1px solid black",
                display: "inline-block",
                verticalAlign: "top",
                width: "50%",
                height: "100%",
              }}
            >
              <h1
                style={{
                  fontSize: "22.5px",
                }}
              >
                Requisitos do Projeto:
              </h1>

              {/* <Link to={newTo2}>
                <Button text="Adicionar Requisito" />
              </Link> */}

              {dados.length > 0 ? (
                remove(dados, dados2).map((el, index) => {
                  if (id == el.projeto) {
                    return (
                      <div
                        style={{
                          borderRadius: "50px",
                          border: " 1px solid black",
                          padding: "10px",
                          marginTop: "5px",
                        }}
                      >
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
                          <b>Estado: </b> {el.descricao}
                          {/* <Link paddinfleft="5px" to={newTo}>
                            <i class="fas fa-edit"></i>
                          </Link> */}
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
        </div>
      </div>
    );
  }
}

export default withRouter(MostrarProjeto);
