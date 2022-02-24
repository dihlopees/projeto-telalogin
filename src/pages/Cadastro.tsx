import React, { useEffect, useState } from 'react';
import api from "../api";
import Header from "../componentes/header/header";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import AddFoto from "../imagens/icone-adicionar-foto.svg";
import { InputAdornment, Select } from "@mui/material";
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


  const tipo = "data:image/png;base64,";


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
          const document: any = reader.result

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

  const navigate = useNavigate();

  function trazerDados() {
    api.get("/cor").then((temp) => {
      setitCor(temp.data)
    })
  }

  function enviandoBack(event) {
    console.log(produto);
    event.preventDefault();

    api.post('/produtos', {
    nome: nome,
    marca: marca,
    valor: valor,
    imagem: imagem,
    data: data,
    corid: cor,
  })
  .then(function (response) {
    console.log("oiiiii" + response);
    alert("Produto Cadastrado com Sucesso");
    navigate("/home")
    
  })
  .catch(function (error) {
    console.log(error);
  });
  }

  return (
    <div>
      <Header />
      <br />
      <nav className="link">
        <br />
        <Link to="../home">Home</Link>
        {"   >  "}
        <Link to="../Cadastro">Adicionar Produto</Link>
      </nav>


      <h2 className="h">Adicionar Produtos</h2>


    
      <div className="quadro">
        <form onSubmit={enviandoBack}>
          <TextField
            className="campo"
            id="outlined-basic"
            label="Nome do Produto"
            variant="outlined"
            value={nome ??""}
            onChange={opcoesNome}
            required
          />
          <br />
          <TextField
            className="campo"
            id="outlined-basic"
            label="Marca"
            variant="outlined"
            onChange={opcoesMarca}
            required
          />
          <br />
          <TextField
            className="campo"
            id="outlined-basic"
            label="Valor"
            variant="outlined"
            onChange={opcoesValor}
            required
            InputProps={{ 
              startAdornment: <InputAdornment position="start">R$</InputAdornment>
            }}
          />
          <br />
          <br/>
          <FormControl>
          <InputLabel id="demo-simple-select-readonly-label">Cor</InputLabel>
          <Select
            className="campo"
            labelId="demo-simple-select-readonly-label"
            id="demo-simple-select-readonly"
            value={cor}
            onChange={opcoesCor}
            required
            
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
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />
          <br />
          <br />
          <input className="addimg" type="file"  onChange={handleFile} required/>
          <img src={imagem ? tipo + imagem : AddFoto} alt="adicionar foto" />
          <br />
          <br />
          <br />
          <button className="bootao" type="submit">  
            ADICIONAR PRODUTO
          </button>
        </form>
      </div>
      
    </div>
  );
}
