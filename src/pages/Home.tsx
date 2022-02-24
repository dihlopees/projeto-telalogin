import React, { useState, useEffect } from "react";
import Header from "../componentes/header/header";
import { Link } from "react-router-dom";
import Addicon from "../imagens/addicone.svg";
import ItemProduto from "../componentes/item-produto/itemProduto";
import api from "../api";
import "./Home.css";

function Home() {
  let headers = localStorage.getItem("token");
  console.log("olha aqui se deu certo" + headers);

  const [lista, setLista] = useState([]);

  useEffect(() => {
    api
      .get("/produtos")
      .then((response) => setLista(response.data))
      .catch((err) => {
        console.log(err);
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  console.log(lista);

  const itensLista = lista.map((it) => (
    <ItemProduto
      img_url={it.imagem}
      name={it.nome}
      marca={it.marca}
      valor={it.valor}
      cor={it.cor.nome}
      id={it.id}
      key={it.id}
    />
  ));

  function clearUser() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return (
    <div>
      <Header />

      <nav className="inicio">
        <button className="botaoinicial">
          <img src={Addicon} className="icone" alt="adicionar produto" />
          <Link to="../Cadastro">Adicionar Produto</Link>
        </button>

        <button className="botaoSair" onClick={() => clearUser()}>
          {" "}
          SAIR DA CONTA
        </button>
      </nav>

      <h1 id="h1">Produtos</h1>

      {itensLista}
    </div>
  );
}

export default Home;
