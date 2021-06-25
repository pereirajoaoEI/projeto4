import { useState } from "react";
import axios from "axios";
import IndexNavBar from "./Navbars/IndexNavbar.js";

const AdicionarProjeto = () => {
  const [nomeProjeto, setNomeProjeto] = useState("");
  const [desc, setDesc] = useState("");
  const [prazo, setPrazo] = useState("");

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
      .then(() => console.log(dados))
      .catch((err) => {
        console.error(err);
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
