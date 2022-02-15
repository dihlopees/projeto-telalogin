import React, {useState} from "react";
import Logo from "../componentes/header/logo.svg"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Button } from "@mui/material";
import "./Login.css";


export default function Login() {
  const estadoInicial = {
    user: "",
    password: ""
  };

  const [inputs, setInputs] = useState(estadoInicial);
  const [showPassoword, setShowPassoword] = useState(false);

  function togglePassoword() {
    setShowPassoword(!showPassoword);
  }

  function setarNovoValor(event) {
    setInputs((preState) => ({
      ...preState,
      [event.target.name]: event.target.value
    }));
  }

  function enviarForm(event) {
    event.preventDefault();

    if (inputs.user === "") {
      return alert("Preencha o usuario");
    }

    if (inputs.password === "") {
      return alert("Preencha a senha");
    }

    // alert(`${inputs.user} / ${inputs.password}`);

    let data = {
      email: inputs.user,
      senha: inputs.password
    }
    console.log("data", data);
  }

  return (
    <div>
      <img id="img-login" src={Logo} alt="logo"/>
      <form className="formulario">
        <div className="password-field">
          <input
            type="text"
            placeholder="E-mail"
            value={inputs.user}
            name="user"
            onChange={setarNovoValor}
          />
          {!inputs.user ? <p class="input-error">Digite seu e-mail </p> : null}
        </div>
        <div className="password-field">
          <input
            type={!showPassoword ? "password" : "text"}
            id="fakePassword"
            placeholder="Senha"
            value={inputs.password}
            name="password"
            onChange={setarNovoValor}
          />
          {!inputs.password ? (
            <p class="input-error">Digite sua senha </p>
          ) : null}

          <span className="icon">
            <button
              className="icon-button"
              type="button"
              onClick={togglePassoword}
            >
              {!showPassoword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </button>
          </span>
        </div>
        <div>
          <Button class="button" type="submit" onClick={enviarForm}>
            LOGAR
          </Button>
        </div>
      </form>
    
    </div>
  );
}