import { useState } from "react";
import axios from "axios";
import IndexNavBar from "./Navbars/IndexNavbar.js";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import {useEffect} from "react"

const AdicionarProjeto = () => {
  const [nomeProjeto, setNomeProjeto] = useState("");
  const [desc, setDesc] = useState("");
  const [prazo, setPrazo] = useState("");
  const [cliente, setCliente] = useState("");
  const today = new Date();
  const [clientes, setClientes]= useState([]);

  const onSubmit = (e) => {
    e.preventDefault();

    const dados = {
      id: uuid(),
      nomeProjeto,
      desc,
      prazo,
      cliente,
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
    const getEvents = async () => {
      const events = await fetchEvents();
      setClientes(events);
     
    };
    getEvents();
  }, []);

  const fetchEvents = async () => {
    // const misId = { misId: mis.id };

    const response = await axios.get(
      "http://localhost:8080/getClientes"
    );
    return response.data;
  };
 
  console.log(clientes)

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

          <div className="form-control">
            <div style={{ paddingBottom: "7px" }}>
              <label>Prioridade</label>
            </div>

            <select
              type="text"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
            >
              {" "}
              <option>Escolha o cliente</option>
              {clientes.map((cli) => <option key= {cli.id} value={cli.nomeCompleto}>{cli.nomeCompleto}</option>)}
            

            </select>
          </div>



{/* <select onChange={(e) => this.handleCities(e)}>
    {dados2.map((e, key) => {
    return <option key={key} value={e.nomeCompleto}>{e.nomeCompleto}</option>;
 })}</select> */}

          <input type="submit" value="Guardar" className="btn btn-block" />
        </form>
      </div>
    </div>
  );
};

export default AdicionarProjeto;
