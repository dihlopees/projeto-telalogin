import { useState, useEffect } from "react";
import Header from "../componentes/header/header.js";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Addicon from "../imagens/addicone.svg";
import ItemProduto from "../componentes/item-produto/itemProduto.js";
import api from "../api";
import "./Home.css";


function Home() {
  //os itens do meu produto é um componente, é onde eu coloco os botoes e é onde vai ser renderizado
  // é onde tem que ter img nome e onde vou passar as props
  //poe classe no itens para fazer css
  //os buttons ja vao ser linkados com as paginas... fazer link to carrinho. e editar.

  //aqui no home em cima fazer o data state, que puxa do api faço .map com props



  const [lista, setLista] = useState([]);

  useEffect(() => {
    api
      .get("/produtos")
      .then((response) => setLista(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  //criar uma função para ficar dentro do meu onclick e essa função é tudo o que esta em api.

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

  return (
    <div>
      <Header />

      <nav class="inicio">

        <Button class="botaoinicial" variant="contained" size="large">
          <img src={Addicon} class="icone" alt="adicionar produto" />
          <Link to="../Cadastro">Adicionar Produto</Link>
        </Button>
      </nav>

      <h1 id="h1">Produtos</h1>
      

      {itensLista}
    </div>
  );
}
//meu produtos vao ter que ser renderizados aqui em cima. e mando renderizar a lista
export default Home;
