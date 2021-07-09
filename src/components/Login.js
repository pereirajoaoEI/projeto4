import { useState } from "react";
import axios from "axios";
import AuthNavBar from "./Navbars/AuthNavbar.js";
import { Link } from "react-router-dom";

const Login = () => {
  const [utilizador, setUtilizador] = useState("");
  const [password, setPassword] = useState("");
  const [tipo, setTipo] = useState("");
  const arrayDados = [];
  var i = 0;

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios.get("http://localhost:8080/getUsers").then((response) => {
      for (let utilizadores of response.data) {
        arrayDados.push(utilizadores.utilizador, utilizadores.password);
      }
    });

    const isInArray = arrayDados.indexOf(utilizador) > -1;
    const isInArray2 = arrayDados.indexOf(password) > -1;
    if (isInArray) {
      if (isInArray2) {
        await axios.get("http://localhost:8080/getUsers").then((response) => {
          console.log(response.data);
          console.log(response.data.length);
          for (i; i < response.data.length; i++) {
            if (response.data.[i].utilizador === utilizador && response.data.[i].password === password) {
              if(response.data.[i].tipo === "Developer"){
                window.location = `/ProjetosUtilizador?utilizador=${utilizador}`;
                //console.log("Entra");
              }
              if(response.data.[i].tipo === "Administrador"){
                //console.log("object")
                window.location = `/Projetos?utilizador=${utilizador}`;
              }
            } 
          }
        });
      } else {
        alert("Login Incorreto!");
        window.location = "/Login";
      }
    } else {
      alert("Login Incorreto!");
      window.location = "/Login";
    }
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
