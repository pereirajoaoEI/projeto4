import { useState } from "react";
import axios from "axios";
import IndexNavBar from "./Navbars/IndexNavbar.js";
import { Link } from "react-router-dom";

const AdicionarProjeto = () => {
  const [utilizador, setUtilizador] = useState("");
  const [password, setPassword] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [contacto, setContacto] = useState("");
  const [tipo, setTipo] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const dados = {
      utilizador,
      password,
      nomeCompleto,
      contacto,
      tipo,
      categoria: "utilizador",
    };

    axios
      .post("http://localhost:8080/insertUser", dados)
      .then(function (response) {
        alert("Inserido com sucesso!");
        window.location = "/Utilizadores";
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
            <label>Tipo</label>
            <input
              type="text"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            ></input>
          </div>

          <input type="submit" value="Guardar" className="btn btn-block" />
        </form>
      </div>
    </div>
  );
};

export default AdicionarProjeto;
