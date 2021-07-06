import React, { Component } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
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
    const {dados} = this.state;
    const {dados2} = this.state;
    
    const newTo2 = {
      pathname: "/AdicionarRequisito",
      param1: `${id}`,
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
    return(
      <div>
        <IndexNavbar />
        <div style={{ paddingTop: "75px" }}>
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
                
                if(id == el.projeto){
                return (
                  <div>{el.descricao}
                  <Link to={newTo}>
                      <Button text="Editar Requisito" />
                  </Link>
                  </div>
                );
                }
              })
            ) : (
              <div>RIP</div>
            )}
        </div>
      </div>
    )}
}

export default withRouter(MostrarProjeto);
