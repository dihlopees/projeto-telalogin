import React, { useEffect, useState } from "react";
import api from "../api";
import Header from "../componentes/header/header";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import AddFoto from "../imagens/icone-adicionar-foto.svg";
import { Alert, InputAdornment, Select, Snackbar } from "@mui/material";
import "./Cadastro.css";
import { ProdutoDto } from "dtos/ProdutoDto";

export function Cadastro() {
  const [cor, setCor] = useState();
  const [nome, setNome] = useState("");
  const [marca, setMarca] = useState("");
  const [imagem, setImagem] = useState();
  const [valor, setValor] = useState(0);
  const [data, setData] = useState();

  const [itCor, setitCor] = useState([]);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [severity, setSeverity] = useState<
    "success" | "info" | "warning" | "error"
  >("success");

  const [message, setMessage] = useState<string>("");

  const tipo = "data:image/png;base64,";

  function opcoesNome(event) {
    setNome(event.target.value);
  }

  const opcoesMarca = (event) => {
    setMarca(event.target.value);
  };

  const opcoesValor = (event) => {
    setValor(event.target.value);
  };

  const opcoesData = (event) => {
    setData(event.target.value);
  };

  const opcoesCor = (event) => {
    setCor(event.target.value);
  };

  function handleFile(event) {
    transFileparaBase(event.target.files[0]);
  }

  function transFileparaBase(file) {
    file.text().then(() => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const document: any = reader.result;

        setImagem(
          document.slice(document.lastIndexOf(",") + 1, document.length)
        );
        console.log(
          document.slice(document.lastIndexOf(",") + 1, document.length)
        );
      };
    });
  }

  useEffect(() => {
    trazerDados();
  }, []);

  function trazerDados() {
    api.get("/cor").then((temp) => {
      setitCor(temp.data);
    });
  }

  function limpar() {
    setMarca("");
    setValor(0);
    setNome("");
    setCor(null);
    setData(null);
    setImagem(null);
  }

  function enviandoBack(event) {
    event.preventDefault();

    const produtoDTO = new ProdutoDto(nome, marca, valor, data, cor, imagem);

    api
      .post("/produtos", produtoDTO)
      .then(function (response) {
        console.log("oiiiii" + response);
        setMessage("Produto criado com sucesso!");
        setSeverity("success");
        setIsOpen(true);

        limpar();
      })
      .catch(function (error) {
        console.log(error);
        setMessage("Erro ao criar produto");
        setSeverity("error");
        setIsOpen(true);
      });
  }
  function closeSnackbar() {
    setIsOpen(false);
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
            value={nome ?? ""}
            onChange={opcoesNome}
            required
          />
          <br />
          <TextField
            className="campo"
            id="outlined-basic"
            label="Marca"
            variant="outlined"
            value={marca ?? ""}
            onChange={opcoesMarca}
            required
          />
          <br />
          <TextField
            className="campo"
            id="outlined-basic"
            label="Valor"
            variant="outlined"
            value={valor ?? ""}
            onChange={opcoesValor}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
          />
          <br />
          <br />
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
              {itCor.map((it) => (
                <MenuItem value={it.id}>{it.nome}</MenuItem>
              ))}
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
            value={data ?? ""}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />
          <br />
          <br />
          <input
            className="addimg"
            type="file"
            onChange={handleFile}
            required
          />
          <img src={imagem ? tipo + imagem : AddFoto} alt="adicionar foto" />
          <br />
          <br />
          <br />
          <button className="bootao" type="submit">
            ADICIONAR PRODUTO
          </button>
        </form>
      </div>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isOpen}
        autoHideDuration={6000}
        onClose={closeSnackbar}
      >
        <Alert
          onClose={closeSnackbar}
          severity={severity}
          sx={{
            width: "100%",
            marginTop: "45px",
            backgroundColor: "rgb(74, 219, 74)",
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
