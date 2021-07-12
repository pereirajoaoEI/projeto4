import { useState } from "react";
import axios from "axios";
import IndexNavBar from "./Navbars/IndexNavbar.js";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useEffect } from "react";

const EditarUtilizador = (props) => {
  const [utilizador, setUtilizador] = useState("");
  const [password, setPassword] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [contacto, setContacto] = useState("");
  const [tipo, setTipo] = useState("");
  const [idAntigo, setIdAntigo] = useState("");
  const [utilizadorParam, setUtilizadorParam] = useState("");

  const options = [
    "Monday",
    "Tuesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    setUtilizador(props.location.param3);
    setPassword(props.location.param4);
    setNomeCompleto(props.location.param5);
    setContacto(props.location.param6);
    setTipo(props.location.param7);
    setIdAntigo(props.location.param1);
    setUtilizadorParam(props.location.param9);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const dados = {
      id: uuid(),
      id_antigo: idAntigo,
      utilizador,
      password,
      nomeCompleto,
      contacto,
      tipo,
    };
    axios
      .post("http://localhost:8080/insertUser", dados)
      .then(function (response) {
        alert("Editado com sucesso!");
        window.location = `/Utilizadores?utilizador=${utilizadorParam}`;
      });
  };

  return (
    <div>
      <div>
        <IndexNavBar expresion={utilizadorParam}/>
      </div>
      <div style={{ paddingTop: "75px", margin: "auto", width: "50%" }}>
        <form className="add-form" onSubmit={onSubmit}>
          <div className="form-control">
            <label style={{ fontSize: "50px" }}>Adicionar Colaborador</label>
            <label>Nome Completo</label>
            <input
              type="text"
              value={nomeCompleto}
              onChange={(e) => setNomeCompleto(e.target.value)}
            ></input>
          </div>
          <div className="form-control">
            <label>Utilizador</label>
            <input
              type="text"
              value={utilizador}
              onChange={(e) => setUtilizador(e.target.value)}
            ></input>
          </div>

          <div className="form-control">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="form-control">
            <label>Email</label>
            <input
              type="email"
              value={contacto}
              onChange={(e) => setContacto(e.target.value)}
            ></input>
          </div>
          <div className="form-control">
            <div style={{ paddingBottom: "7px" }}>
              <label>Tipo</label>
            </div>

            <select
              type="text"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              {" "}
              <option value="Administrador">Administrador ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎  ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎  ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ </option>
              <option value="Developer">Developer</option>
              <option value="Cliente">Cliente</option>
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

export default EditarUtilizador;
