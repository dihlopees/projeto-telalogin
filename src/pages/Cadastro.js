import React, { useEffect, useState } from 'react';
import api from "../api";
import Header from "../componentes/header/header.js";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Button, Select } from "@mui/material";
import AddFoto from "../imagens/icone-adicionar-foto.svg";
import "./Cadastro.css";

export function Cadastro() {

  const [cor, setCor] = useState();
  const [nome, setNome]= useState("");
  const [marca, setMarca]= useState("");
  const [imagem, setImagem]= useState();
  const [valor, setValor]= useState();
  const [data, setData]= useState();
  //para pegar os dados e enviar para o banco temos que criar uma consts dessas pra cada um.
  //crio uma const para maperar o objeto.
  //crio uma constante para fazer setCor event.target.value e depois coloco no onchange.
  const [itCor, setitCor] = useState([]);

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
  // const opcoesImagem = (event) => {
  //   setImagem(event.target.value);
  // };

  const opcoesCor = (event) => {
    setCor(event.target.value);
  };

  function handleFile(event) {
    transFileparaBase(event.target.files[0])
   
    
    };

    function transFileparaBase(file){
      file.text().then(() => {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          const document = reader.result

          setImagem(document.slice(document.lastIndexOf(",") + 1, document.length)) 
          console.log(document.slice(document.lastIndexOf(",") + 1, document.length));
        };


      })
    };

  const produto = [
    {
      nome,
      marca,
      valor,
      data,
      cor,
      imagem,

    }
  ];

 

  useEffect(()=> {
    trazerDados();
   
  },[]
  );


  function trazerDados() {
    api.get("/cor").then((temp) => {
      setitCor(temp.data)
    })
  }

  function enviandoBack() {
    console.log(produto);

    api.post('/produtos', {
    nome: nome,
    marca: marca,
    valor: valor,
    imagem: imagem,
    data: data,
    corid: cor,
  },
    api.post('produtos/upload', {
      imagem: imagem,
    }))
  .then(function (response) {
    window.location.replace('/')
    alert("Produto cadastrado com sucesso");
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  }

  return (
    <div>
      <Header />
      <br />
      <nav class="link">
        <br />
        <Link to="../">Home</Link>
        {"   >  "}
        <Link to="../Cadastro">Adicionar Produto</Link>
      </nav>


      <h2 class="h">Adicionar Produtos</h2>


     {/* window.location.reload() */}
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
            onChange={opcoesMarca}
          />
          <br />
          <TextField
            className="campo"
            id="outlined-basic"
            label="Valor"
            variant="outlined"
            onChange={opcoesValor}
          />
          <br />
          <br/>
          <FormControl sx={{width:"20ch"}}>
          <InputLabel id="demo-simple-select-readonly-label">Cor</InputLabel>
          <Select
            className="campo"
            labelId="demo-simple-select-readonly-label"
            id="demo-simple-select-readonly"
            value={cor}
            onChange={opcoesCor}
            
          >
           { 
           itCor.map((it) => (
            <MenuItem value={it.id}>{it.nome}</MenuItem>
           ))
           }
           
          </Select>
          </FormControl>
          <br />
          <TextField
            className="campo"
            id="outlined-basic"
            label="Data do Cadastro"
            type="Date"
            placeholder="none"
            variant="outlined"
            onChange={opcoesData}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />
          <br />
          <br />
          <input class="addimg" type="file"  onChange={handleFile} />
          <img src={AddFoto} alt="adicionar foto" />
          <br />
          <br />
          <br />
          <Button class="botão" variant="contained" size="large" onClick={() => enviandoBack()}>
            ADICIONAR PRODUTO
          </Button>
        </form>
      </div>
    </div>
  );
}
