import { useState } from "react";
import axios from "axios";
import IndexNavBar from "./Navbars/IndexNavbar.js";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useEffect } from "react";

const AdicionarRequisito = (props) => {
    const [id, setId] = useState("");
    const [descricao, setDescricao] = useState("");
    const [prioridade, setPrioridade] = useState("");

  useEffect(() => {
    setId(props.location.param1);
  }, []);
  
  const onSubmit = (e) => {
    e.preventDefault();

    const dados = {
        id: uuid(),
        descricao,
        prioridade,
        projeto: id,
        categoria: "requisito"
    };
    axios
      .post("http://localhost:8080/insertRequisito", dados)
      .then(function (response) {
        alert("Inserido com sucesso!");
        window.location = "/Projetos";
      });
  };

  return (
    <div>
      <div>
        <IndexNavBar />
      </div>
      <div style={{ paddingTop: "75px", margin: "auto", width: "50%" }}>
        <form className="add-form" onSubmit={onSubmit}>
          <div className="form-control">
            <label style={{ fontSize: "50px" }}>Adicionar Colaborador</label>
            <label>Descrição</label>
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            ></input>
          </div>
          <div className="form-control">
            <div style={{ paddingBottom: "7px" }}>
              <label>Tipo</label>
            </div>

            <select
              type="text"
              value={prioridade}
              onChange={(e) => setPrioridade(e.target.value)}
            >
              {" "}
              <option>Escolha a prioridade</option>
              <option value="Baixa">Baixa</option>
              <option value="Media">Média</option>
              <option value="Alta">Alta</option>
            </select>
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

export default AdicionarRequisito;
