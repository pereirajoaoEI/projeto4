import { useState } from "react";
import axios from "axios";
import IndexNavBar from "./Navbars/IndexNavbar.js";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useEffect } from "react";

const EditarProjeto = (props) => {
  const [nomeProjeto, setNome] = useState("");
  const [id, setId] = useState("");
  const [prazo, setPrazo] = useState("");
  const [gestor, setGestor] = useState("");
  const [cliente, setCliente] = useState("");
  const [clientes, setClientes] = useState([]);
  const [gestores, setGestores] = useState([]);
  const [desc, setDescricao] = useState([]);
  const [equipa, setEquipa] = useState([]);

  useEffect(() => {
    setNome(props.location.param2);
    setId(props.location.param1);
    setPrazo(props.location.param3);
    setGestor(props.location.param4);
    setCliente(props.location.param5);
    setDescricao(props.location.param6);
    setEquipa(props.location.param7);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const dados = {
      id: uuid(),
      id_antigo: id,
      nomeProjeto,
      prazo,
      gestor,
      cliente,
      desc,
      equipa: [equipa],
      categoria: "projeto",
    };
    
    axios
      .post("http://localhost:8080/insertProjeto", dados)
      .then(function (response) {
        alert("Editado com sucesso!");
        window.location = "/Projetos";
      });
  };

  useEffect(() => {
    const getEvents = async () => {
      const events = await fetchEvents();
      setClientes(events);
    };
    const getGestores = async () => {
      const events = await fetchGestores();
      setGestores(events);
    };
    getEvents();
    getGestores();
  }, []);

  const fetchEvents = async () => {
    // const misId = { misId: mis.id };
    const response = await axios.get("http://localhost:8080/getClientes");
    return response.data;
  };

  const fetchGestores = async () => {
    // const misId = { misId: mis.id };
    const response = await axios.get("http://localhost:8080/getGestores");
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
              onChange={(e) => setNome(e.target.value)}
            ></input>
          </div>
          <div className="form-control">
            <label>Descrição do projeto</label>
            <input
              type="text"
              value={desc}
              onChange={(e) => setDescricao(e.target.value)}
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

          <div className="form-control">
            <div style={{ paddingBottom: "7px" }}>
              <label>Cliente</label>
            </div>

            <select
              type="text"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
            >
              {" "}
              <option>Escolha o cliente</option>
              {clientes.map((cli) => (
                <option key={cli.id} value={cli.nomeCompleto}>
                  {cli.nomeCompleto}
                </option>
              ))}
            </select>

            <div style={{ paddingBottom: "7px" }}>
              <label>Gestor de Equipa</label>
            </div>

            <select
              type="text"
              value={gestor}
              onChange={(e) => setGestor(e.target.value)}
            >
              {" "}
              <option>Escolha o Gestor de Equipa</option>
              {gestores.map((ges) => (
                <option key={ges.id} value={ges.nomeCompleto}>
                  {ges.nomeCompleto}
                </option>
              ))}
            </select>
          </div>
          
          <input type="submit" value="Guardar" className="btn btn-block" />
        </form>
      </div>
    </div>
  );
};

export default EditarProjeto;
