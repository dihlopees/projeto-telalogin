import React from "react";
import "./itemCarrinho.css";

const UnicoItem = (props) => {

  const tipo = "data:image/png;base64,";

  console.log(props);


  return (
    <div class="quadradocompras">
      <img src={tipo + props.img_url} alt="imagemdoproduto" />

      <div class="descrisaodositens">
        <h2> {props.name} </h2>
        
        <p> {props.marca} </p>
        
        <p> cor: {props.cor} </p>
      </div>
    </div>
  );
};

export default UnicoItem;
