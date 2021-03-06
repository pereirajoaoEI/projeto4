import { useState } from "react";
import axios from "axios";
import GestorNavBar from "./Navbars/GestorNavbar.js";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useEffect } from "react";

const AdicionarRequisito = (props) => {
  const [id, setId] = useState("");
  const [utilizador, setUtilizador] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [cliente, setCliente] = useState("");
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    setId(props.location.param1);
    setUtilizador(props.location.param2);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const dados = {
      id: uuid(),
      descricao,
      utilizador,
      prioridade,
      cliente,
      projeto: id,
      categoria: "requisito",
      estado: "Backlog",
    };
    axios
      .post("http://localhost:8080/insertRequisito", dados)
      .then(function (response) {
        alert("Inserido com sucesso!");
        window.location = `/ProjetosUtilizador?utilizador=${utilizador}`;
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
    const response = await axios.get("http://localhost:8080/getClientes");
    return response.data;
  };

  return (
    <div>
      <div>
        <GestorNavBar expression={utilizador} />
      </div>
      <div style={{ paddingTop: "75px", margin: "auto", width: "50%" }}>
        <form className="add-form" onSubmit={onSubmit}>
          <div className="form-control">
            <label style={{ fontSize: "50px", textAlign: "center" }}>Adicionar Requisito</label>
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
                  <option>Escolha a prioridade ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎‎</option>
                  <option value="Baixa">Baixa</option>
                  <option value="Media">Média</option>
                  <option value="Alta">Alta</option>
                </select>
              </div>
            </div>

            <div style={{display:"inline-block", paddingLeft:"25px"  }}>
              <div style={{ paddingBottom: "7px" }}>
                <label>Stakeholder</label>
              </div>

              <select
                type="text"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
              >
                {" "}
                <option>Escolha o Stakeholder ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ </option>
                {clientes.map((cli) => (
                  <option key={cli.id} value={cli.nomeCompleto}>
                    {cli.nomeCompleto}
                  </option>
                ))}
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

export default AdicionarRequisito;
