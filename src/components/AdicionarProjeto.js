import { useState } from "react";
import axios from "axios";
import IndexNavBar from "./Navbars/IndexNavbar.js";
import { Link } from "react-router-dom";

const AdicionarProjeto = () => {
  const [nomeProjeto, setNomeProjeto] = useState("");
  const [desc, setDesc] = useState("");
  const [prazo, setPrazo] = useState("");
  const today = new Date();

  const onSubmit = (e) => {
    e.preventDefault();

    const dados = {
      nomeProjeto,
      desc,
      prazo,
      categoria: "requesito",
    };

    axios
      .post("http://localhost:8080/insert_requesito", dados)
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
            <label style={{ fontSize: "50px" }}>Adicionar Projeto</label>
            <label>Nome Projeto</label>
            <input
              type="text"
              value={nomeProjeto}
              onChange={(e) => setNomeProjeto(e.target.value)}
            ></input>
          </div>
          <div className="form-control">
            <label>Descrição do projeto</label>
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></input>
          </div>

          <div className="form-control form-control-check">
            <label>Prazo</label>
            <input
              type="date"
              value={prazo}
              onChange={(e) => setPrazo(e.target.value)}
            ></input>
          </div>

          <input type="submit" value="Guardar" className="btn btn-block" />
        </form>
      </div>
    </div>
  );
};

export default AdicionarProjeto;
