import Header from "componentes/header/header";
import React, { useState } from "react";
import endpointEsqueci from "services/endpoint.esqueci";

function Esqueci() {
  const estadoInicial = {
    user: "",
  };

  const [inputs, setInputs] = useState(estadoInicial);

  function setarNovoValor(event) {
    setInputs((preState) => ({
      ...preState,
      [event.target.name]: event.target.value,
    }));
  }

  const enviarForm = async (event) => {
    event.preventDefault();

    if (inputs.user === "") {
      return alert("Email não pode estar vazio");
    }

    let data = {
      email: inputs.user,
    };

    try {
      endpointEsqueci.enviando(data);
      console.log("deu certoooooo eu achoooooo" , data)
      alert("Uma senha temporaria foi enviada para o email:  " + data.email)
      window.location.href = "/home";
    } catch (error) {
      console.log(error);
      alert("Erro ao enviar email")

    }
  };

  return (
    <>
      <Header />
      <div>
        <form onSubmit={enviarForm}
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "50px",
          }}
        >
          <div className="password-field">
            <p
              style={{
                paddingBottom: "15px",
                textAlign: "center",
                fontSize: "20px",
              }}
            >
              Confirme seu e-mail:{" "}
            </p>
            <input
              type="text"
              placeholder="E-mail"
              value={inputs.user}
              name="user"
              onChange={setarNovoValor}
            />
            {!inputs.user ? (
              <p
                style={{
                  color: "red",
                  paddingTop: "15px",
                  paddingBottom: "20px",
                  fontSize: "12px",
                }}
              >
                {" "}
                * Este campo é obrigatório{" "}
              </p>
            ) : null}

            <button
              style={{ display: "block", marginTop: "10px" }}
              className="button"
              type="submit"
              
            >
              CONFIRMAR
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default Esqueci;
