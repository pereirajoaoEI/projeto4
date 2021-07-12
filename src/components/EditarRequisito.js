import { useState } from "react";
import axios from "axios";
import GestorNavBar from "./Navbars/GestorNavbar.js";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useEffect } from "react";

const EditarRequisito = (props) => {
  const [descricao, setDescricao] = useState("");
  const [id, setId] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [projeto, setProjeto] = useState("");
  const [utilizador, setUtilizador] = useState("");
  const [cliente, setCliente] = useState("");
  const [estado, setEstado] = useState("");

  useEffect(() => {
    setDescricao(props.location.param2);
    setId(props.location.param1);
    setPrioridade(props.location.param3);
    setProjeto(props.location.param4);
    setUtilizador(props.location.param5);
    setCliente(props.location.param6);
    setEstado(props.location.param7);
  }, []);

  // const id_props = props.location.param1;
  // const id_antigo_props = props.location.param2;
  // const password_props = props.location.param4;
  // const nomeCompleto_props = props.location.param5;
  // const contacto_props = props.location.param6;
  // const tipo_props = props.location.param7;
  // const categoria_props = props.location.param8;

  const onSubmit = (e) => {
    e.preventDefault();

    const dados = {
      id: uuid(),
      id_antigo: id,
      descricao,
      prioridade,
      projeto: projeto,
      categoria: "requisito",
      cliente: cliente,
      utilizador: utilizador,
      estado,
    };

    axios
      .post("http://localhost:8080/insertRequisito", dados)
      .then(function (response) {
        alert("Editado com sucesso!");
        window.location = `/ProjetosUtilizador?utilizador=${utilizador}`;
      });
  };

  return (
    <div>
      <div>
        <GestorNavBar expression={utilizador} />
      </div>
      <div style={{ paddingTop: "75px", margin: "auto", width: "50%" }}>
        <form className="add-form" onSubmit={onSubmit}>
          <div className="form-control">
            <label style={{ fontSize: "50px" }}>Editar Requisito</label>
            <label>Descrição</label>
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            ></input>
          </div>
          <div>
            <div style={{display:"inline-block"   }}>
              <div className="form-control">
                <div style={{ paddingBottom: "7px" }}>
                  <label>Prioridade</label>
                </div>

                <select
                  type="text"
                  value={prioridade}
                  onChange={(e) => setPrioridade(e.target.value)}
                >
                  {" "}
                  <option>Escolha a prioridade‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎  ‎‏‏‎‎</option>
                  <option value="Baixa">Baixa</option>
                  <option value="Media">Média</option>
                  <option value="Alta">Alta</option>
                </select>
              </div>
            </div>

            <div style={{display:"inline-block", paddingLeft:"25px"  }}>
              <div style={{ paddingBottom: "7px" }}>
                <label>Estado</label>
              </div>

              <select
                  type="text"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                >
                  {" "}
                  <option>Escolha o Estado‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎  ‎‏‏‎‎</option>
                  <option value="Desenvolvimento">Em Desenvolvimento‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ </option>
                  <option value="Concluido">Concluido</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
            </div>
          </div>

          {/* <Autocomplete
        options={options}
        style={{ width: 300 }}
        renderInput={(params) =>
          <TextField {...params} label="Combo box" variant="outlined" />}
      /> */}

          <input type="submit" value="Guardar" className="btn btn-block" />
        </form>
      </div>
    </div>
  );
};

export default EditarRequisito;
