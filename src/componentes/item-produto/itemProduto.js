import React from "react";
import api from "../../api";
import { Link } from "react-router-dom";
import Carrinho from "../../imagens/icone-carrinho.svg";
import Editar from "../../imagens/icone-editar.svg";
import Deletar from "../../imagens/icone-deletar.svg";
import "./itemProduto.css";

const ItemProduto = (props) => {
  const id = "../Produtos/" + props.id;
  const ideditar = "../editar/" + props.id;
  

  const tipo = "data:image/png;base64,";

  function conv(numero) {
    return numero.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  }

  function rotaDeletar() {
    api
    .delete("/produtos/" + id)
    .then(function (response) {
        window.location.reload(true);
        alert("Produto deletado com sucesso");
        console.log(response);
      })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
};
  

  return (
    <div class="quadradoGrande">
      <img src={tipo + props.img_url} alt="imagemdoproduto" />

      <div class="descrisãodositens">
        <h2> {props.name} </h2>
        <br />
        <p> {props.marca} </p>
        <br />
        <h3> {conv(parseFloat(props.valor))}</h3>
        <br />
        <p> cor: {props.cor} </p>
      </div>

      <div class="iconeRedondos">
        <button size="large">
          <Link to={id}>
            <img src={Carrinho} alt="comprar produto" />
          </Link>
        </button>
        <button size="large">
          <Link to={ideditar}>
            <img src={Editar} alt="editar produto" />
          </Link>
        </button>
        <button size="large">
          <img src={Deletar} alt="deletar produto" onClick={() => rotaDeletar()} />
        </button>
      </div>
    </div>
  );
};

export default ItemProduto;
