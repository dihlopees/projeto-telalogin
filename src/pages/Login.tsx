import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../componentes/header/logo.svg";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "./Login.css";
import authService from "../services/auth.service";

function Login(props) {
  // const navegar = useNavigate();

  

  // useEffect(() => {
  //   if (authService.getLoggedUser()) {
  //     navegar("/home");
     
  //   }
  // }, []);

  const estadoInicial = {
    user: "",
    password: "",
  };

  const [inputs, setInputs] = useState(estadoInicial);
  const [showPassoword, setShowPassoword] = useState(false);
 

  function togglePassoword() {
    setShowPassoword(!showPassoword);
  }

  function setarNovoValor(event) {
    setInputs((preState) => ({
      ...preState,
      [event.target.name]: event.target.value,
    }));
  }

  const enviarForm = async (event) => {
    event.preventDefault();

    if (inputs.user === "") {
      return alert("Preencha o usuario");
    }

    if (inputs.password === "") {
      return alert("Preencha a senha");
    }

    let data = {
      email: inputs.user,
      senha: inputs.password,
    };
    try {
      let res = await authService.authenticate(data);
      console.log("RESPOSTA", res.data);

      if (!res.data) {
        alert("Usuario não cadastrado");
      } else {
        
        authService.setLoggedUser(res.data);
        window.location.href = "/home";
        console.log("home")
        
      }
      
  

    } catch (error) {
      console.log(error);
      alert("Erro ao efetuar o login");
    }
    // console.log("data", data);
  };

  return (
    <div className="formulario">
      <img id="img-login" src={Logo} alt="logo" />
      <form onSubmit={enviarForm}>
        <div className="password-field">
          <input
            type="text"
            placeholder="E-mail"
            value={inputs.user}
            name="user"
            onChange={setarNovoValor}
          />
          {!inputs.user ? (
            <p className="input-error">Digite seu e-mail </p>
          ) : null}
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
            <p className="input-error">Digite sua senha </p>
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
          <button className="button" type="submit">
            LOGAR
          </button>



          <div className="esqueciSenha">
            <Link to="../usuario/esqueci">ESQUECI MINHA SENHA</Link>
            </div>

        </div>
      </form>
    </div>
  );
}
export default Login;
