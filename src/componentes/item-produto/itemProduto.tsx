import React, { useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";
import Carrinho from "../../imagens/icone-carrinho.svg";
import Editar from "../../imagens/icone-editar.svg";
import Deletar from "../../imagens/icone-deletar.svg";
import "./itemProduto.css";
import { Snackbar, Alert } from "@mui/material";

const ItemProduto = (props) => {
  const id = "../Produtos/" + props.id;
  const ideditar = "../editar/" + props.id;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const tipo = "data:image/png;base64,";

  function conv(numero) {
    return numero.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  }

  function closeSnackbar() {
    setIsOpen(false);
  }

  function rotaDeletar() {
    api
      .delete("/produtos/" + id)
      .then(function (response) {
        setIsOpen(true);

        // window.location.reload()

        // alert("Produto Deletado com Sucesso");
        console.log(response);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }

  return (
    <div className="quadradoGrande">
      <img src={tipo + props.img_url} alt="imagemdoproduto" />

      <div className="descrisãodositens">
        <h2> {props.name} </h2>
        <br />
        <p> {props.marca} </p>
        <br />
        <h3> {conv(parseFloat(props.valor))}</h3>
        <br />
        <p> cor: {props.cor} </p>
      </div>

      <div className="iconeRedondos">
        <button>
          <Link to={id}>
            <img src={Carrinho} alt="comprar produto" />
          </Link>
        </button>
        <button>
          <Link to={ideditar}>
            <img src={Editar} alt="editar produto" />
          </Link>
        </button>
        <button>
          <img
            src={Deletar}
            alt="deletar produto"
            onClick={() => rotaDeletar()}
          />
        </button>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        open={isOpen}
        autoHideDuration={6000}
        onClose={closeSnackbar}
      >
        <Alert
          onClose={closeSnackbar}
          severity="success"
          sx={{
            width: "100%",
            marginTop: "45px",
            backgroundColor: "rgb(221, 116, 116)",
          }}
        >
          Produto deletado com sucesso!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ItemProduto;
