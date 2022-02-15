import React, { useEffect, useState } from "react";
import api from "../api";
import Header from "../componentes/header/header.js";
import { Link , useParams} from "react-router-dom";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from "@mui/material/MenuItem";
import { Button, Select } from "@mui/material";
import AddFoto from "../imagens/icone-adicionar-foto.svg";
import "./Cadastro.css";

export function Editar() {
  const [cor, setCor] = useState(0);
  const [nome, setNome]= useState("");
  const [marca, setMarca]= useState("");
  const [imagem, setImagem]= useState("");
  const [valor, setValor]= useState();
  const [data, setData]= useState();

  const [itCor, setitCor] = useState([]);


  const { id } = useParams();
  console.log(id);


  function opcoesNome(event) {
    setNome(event.target.value);
  };

  const opcoesMarca = (event) => {
    setMarca(event.target.value);
  };

  const opcoesValor = (event) => {
    setValor(event.target.value);
  };

  const opcoesData = (event) => {
    setData(event.target.value);
  };
  const opcoesImagem = (event) => {
    setImagem(event.target.value);
  };

  const opcoesCor = (event) => {
    setCor(event.target.value);
  };

 

  useEffect(() => {
    trazerCor();
    trazerDados();
  }, []);



  function trazerCor() {
    api.get("/cor").then((temp) => {
      setitCor(temp.data);
    });
  };



  function trazerDados() {
    api
      .get("/produtos/" + id)
      .then((response) => {
       
        setNome(response.data.nome);
        setMarca(response.data.marca);
        setValor(response.data.valor);
        setCor(response.data.cor.id);
        setData(response.data.data);
        setImagem(response.data.imagem);


        
        console.log(response.data);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }



  function enviandoBack() {
    

    api.put("/produtos/" + id, {
    nome: nome,
    marca: marca,
    valor: valor,
    data: data,
    corid: cor,
    imagem: imagem,

  })
  .then(function (response) {
    window.location.replace('/')
    alert("Produto editado com sucesso");
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  };

  console.log(itCor)
  return (
    <div>
      <Header />
      <br />
      <nav class="link">
        <br />
        <Link to="../">Home</Link>
        {"   >  "}
        <Link to="../Editar">Editar Produto</Link>
      </nav>

      <h2 class="h">Editar Produtos</h2>

      <div class="quadro">
        <form>
          <TextField
            className="campo"
            id="outlined-basic"
            label="Nome do Produto"
            variant="outlined"
            value={nome ??""}
            onChange={opcoesNome}
          />
          <br />
          <TextField
            className="campo"
            id="outlined-basic"
            label="Marca"
            variant="outlined"
            value={marca ??""}
            onChange={opcoesMarca}
          />
          <br />
          <TextField
            className="campo"
            id="outlined-adornment-amount"
            variant="outlined"
            value={valor ??""}
            onChange={opcoesValor}
            startAdornment={<InputAdornment position="start">R$</InputAdornment>}
            label="Valor"
          />
          <br />
          <br/>
          <FormControl sx={{ width: "20ch" }}>
            <InputLabel id="demo-simple-select-readonly-label">Cor</InputLabel>
            <Select
              className="campo"
              labelId="demo-simple-select-readonly-label"
              id="demo-simple-select-readonly"
              value={cor}
              onChange={opcoesCor}
            >
              {itCor.map((it) => {
                return (
                <MenuItem value={it.id}>{it.nome}</MenuItem>
              )})}
            </Select>
          </FormControl>
          <br />
          <TextField
            className="campo"
            id="outlined-basic"
            label="Data do Cadastro"
            type="date"
            placeholder="none"
            variant="outlined"
            value={data}
            onChange={opcoesData}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />
          <br />
          <br />
          <input class="addimg" type="file"  />
          <img src={AddFoto} alt="adicionar foto" />
          {/* <input type="file" ><img src={imagem} alt="imagem do produto" /></input> */}
          <br />
          <br />
          <br />

          <Button class="botão" variant="contained" size="large" onClick={() => enviandoBack()}>
            SALVAR PRODUTO
          </Button>
        </form>
      </div>
    </div>
  );
}
