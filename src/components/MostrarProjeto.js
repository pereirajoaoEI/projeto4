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
    const { dados } = this.state;
    const { dados2 } = this.state;

    console.log(equipa);

    const newTo2 = {
      pathname: "/AdicionarRequisito",
      param1: `${id}`,
    };

    const newTo3 = {
      pathname: "/EditarProjeto",
      param1: `${id}`,
      param2: `${nomeProjeto}`,
      param3: `${prazo}`,
      param4: `${gestor}`,
      param5: `${cliente}`,
      param6: `${descricao}`,
      param7: `${equipa}`,
    };

    const newTo4 = {
      pathname: "/DefinirEquipa",
      param1: `${id}`,
      param2: `${nomeProjeto}`,
      param3: `${prazo}`,
      param4: `${gestor}`,
      param5: `${cliente}`,
      param6: `${descricao}`,
      param7: `${equipa}`,
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
        <IndexNavbar />
        <div style={{ paddingTop: "75px" }}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                border: "1px solid black",
                display: "inline-block",
                verticalAlign: "middle",
                width: "50%",
              }}
            >
              <b> Prazo: </b>
              {prazo}
              <br></br>
              <b>Cliente:</b> {cliente}
              <br></br>
              <b>Gestor:</b> {gestor}
              <br></br>
              <Link to={newTo3}>
                <Button text="Editar Projeto" />
              </Link>
            </div>
            <div
              style={{
                border: "1px solid black",
                display: "inline-block",
                verticalAlign: "middle",
                width: "50%",
              }}
            >
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
                  };

                  if (id == el.projeto) {
                    return (
                      <div>
                        <Link to={newTo}>
                          <i class="fas fa-edit"></i>
                        </Link>
                        {el.descricao}
                      </div>
                    );
                  }
                })
              ) : (
                <div>Nao existem requisitos a mostrar</div>
              )}
            </div>
          </div>
          <div
            style={{
              width: "50%",
              border: "1px solid black",
            }}
          >
            <Link to={newTo4}>
              <Button text="Definir Equipa" />
            </Link>
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

export default withRouter(MostrarProjeto);
