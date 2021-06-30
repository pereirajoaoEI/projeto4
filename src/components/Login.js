import { useState } from "react";
import axios from "axios";
import AuthNavBar from "./Navbars/AuthNavbar.js";
import { Link } from "react-router-dom";

const Login = () => {
  const [utilizador, setUtilizador] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios.get("http://localhost:8080/getUsers").then((response) => {
      for (let utilizadores of response.data) {
        if (
          utilizador === utilizadores.utilizador &&
          password === utilizadores.password
        ) {
          window.location.href = "/Projetos";
        } else {
          alert("Login Incorreto!");
        }
      }
    });

    //window.location.href = "/Projetos";
  };

  return (
    <div>
      <div>
        <AuthNavBar />
      </div>
      <div style={{ paddingTop: "75px", margin: "auto", width: "50%" }}>
        <i
          class="fa fa-user"
          style={{
            textAlign: "center",
            display: "inline-block",
            width: "100%",
          }}
        ></i>
        <form className="add-form" onSubmit={onSubmit}>
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

          <input type="submit" value="Confirmar" className="btn btn-block" />
        </form>
      </div>
    </div>
  );
};

export default Login;
