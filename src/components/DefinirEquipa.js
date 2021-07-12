import { useState } from "react";
import axios from "axios";
import GestorNavBar from "./Navbars/GestorNavbar.js";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useEffect } from "react";
import { height } from "tailwindcss/defaultTheme";

const DefinirEquipa = (props) => {
  const [nomeProjeto, setNome] = useState("");
  const [id, setId] = useState("");
  const [prazo, setPrazo] = useState("");
  const [gestor, setGestor] = useState("");
  const [cliente, setCliente] = useState("");
  const [desc, setDescricao] = useState([]);
  const [equipa, setEquipa] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [utilizador, setUtilizador] = useState([]);

  useEffect(() => {
    setNome(props.location.param2);
    setId(props.location.param1);
    setPrazo(props.location.param3);
    setGestor(props.location.param4);
    setCliente(props.location.param5);
    setDescricao(props.location.param6);
    setUtilizador(props.location.param8);
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
      categoria: "projeto",
      equipa,
    };

    axios
      .post("http://localhost:8080/insertProjeto", dados)
      .then(function (response) {
        alert("Editado com sucesso!");
        window.location = `/ProjetosUtilizador?utilizador=${utilizador}`;
      });
  };

  useEffect(() => {
    const getDevelopers = async () => {
      const events = await fetchEvents();
      setDevelopers(events);
    };
    getDevelopers();
  }, []);

  const fetchEvents = async () => {
    // const misId = { misId: mis.id };
    const response = await axios.get("http://localhost:8080/getDevelopers");
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
            <label style={{ fontSize: "50px" }}>Membros da Equipa</label>
            <div style={{ width: "50%", display: "inline-block" }}>
              {developers.map((dev) => {
                if (dev.utilizador != utilizador) {
                  return (
                    <div>
                      <div
                      style={{display: "inline-block", width: "35px" }}
                      >
                        <input
                          type="checkbox"
                          key={dev.id}
                          value={dev.utilizador}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setEquipa([...equipa, e.target.value]);
                            } else {
                              equipa.splice(equipa.indexOf(e.target.value), 1);
                            }
                          }}
                        />
                      </div>
                      <div style={{display: "inline-block", paddingLeft:"16px" }}>
                        <h4
                          for="scales"
                        >
                          {dev.nomeCompleto}
                        </h4>
                      </div>
                      
                    </div>
                  );
                }
              })}
              {/* <label for="scales">{developers.nomeCompleto}</label> */}
              {/* <input type="checkbox" id="scales" name="scales" /> */}
            </div>
          </div>
          <input type="submit" value="Guardar" className="btn btn-block" />
        </form>
      </div>
    </div>
  );
};

export default DefinirEquipa;
