import { useState } from "react";
import axios from "axios";
import IndexNavBar from "./Navbars/IndexNavbar.js";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useEffect } from "react";

const AdicionarProjeto = () => {
  const [nomeProjeto, setNomeProjeto] = useState("");
  const [desc, setDesc] = useState("");
  const [prazo, setPrazo] = useState("");
  const [cliente, setCliente] = useState("");
  const [gestor, setGestor] = useState("");
  const today = new Date();
  const [gestores, setGestores] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();

    const dados = {
      id: uuid(),
      id_antigo: 0,
      nomeProjeto,
      desc,
      prazo,
      gestor,
      equipa: [],
      categoria: "projeto",
    };

    axios
      .post("http://localhost:8080/insertProjeto", dados)
      .then(function (response) {
        alert("Inserido com sucesso!");
        window.location = "/Projetos";
      });
  };

  useEffect(() => {
    const getGestores = async () => {
      const events = await fetchGestores();
      setGestores(events);
    };

    getGestores();
  }, []);

  const fetchGestores = async () => {
    const response = await axios.get("http://localhost:8080/getDevelopers");
    return response.data;
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

          <div className="form-control">
            <div style={{ paddingBottom: "7px" }}>
              <label>Gestor de Equipa</label>
            </div>

            <select
              type="text"
              value={gestor}
              onChange={(e) => setGestor(e.target.value)}
            >
              {" "}
              <option>Escolha o Gestor de Equipa ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ </option>
              {gestores.map((ges) => (
                <option key={ges.id} value={ges.nomeCompleto}>
                  {ges.nomeCompleto}
                </option>
              ))}
            </select>
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
