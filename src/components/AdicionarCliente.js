import { useState } from "react";
import axios from "axios";
import IndexNavBar from "./Navbars/IndexNavbar.js";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

const AdicionarCliente = () => {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [contacto, setContacto] = useState("");
  const [empresa, setEmpresa] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const dados = {
      id: uuid(),
      id_antigo: 0,
      nomeCompleto,
      contacto,
      tipo: "Cliente",
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
            <label style={{ fontSize: "50px" }}>Adicionar Cliente</label>
            <label>Nome Completo</label>
            <input
              type="text"
              value={nomeCompleto}
              onChange={(e) => setNomeCompleto(e.target.value)}
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
            <label>Empresa</label>
            <input
              type="text"
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
            ></input>
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

export default AdicionarCliente;
