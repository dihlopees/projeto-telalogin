import React, { useEffect, useState } from "react";
import api from "../api";
import Header from "../componentes/header/header";
import { Link, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Alert, InputAdornment, Select, Snackbar } from "@mui/material";

import "./Cadastro.css";

export function Editar() {
  const [cor, setCor] = useState(0);
  const [nome, setNome] = useState("");
  const [marca, setMarca] = useState("");
  const [imagem, setImagem] = useState("");
  const [valor, setValor] = useState();
  const [data, setData] = useState();

  const [itCor, setitCor] = useState([]);

  const tipo = "data:image/png;base64,";

  // const navegar = useNavigate();

  const { id } = useParams();
  console.log(id);

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

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [severity, setSeverity] = useState<
    "success" | "info" | "warning" | "error"
  >("success");

  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    trazerCor();
    trazerDados();
  }, []);

  function trazerCor() {
    api.get("/cor").then((temp) => {
      setitCor(temp.data);
    });
  }

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

  function enviandoBack(event) {
    event.preventDefault();

    api
      .put("/produtos/" + id, {
        nome: nome,
        marca: marca,
        valor: valor,
        data: data,
        corid: cor,
        imagem: imagem,
      })
      .then(function (response) {
        console.log("oiiiiiiiiiiuuuu" + response);
        setMessage("Produto editado com sucesso!");
        setSeverity("success");
        setIsOpen(true);
        // alert("Produto Editado com Sucesso");
        // // navegar("/home")
      })
      .catch(function (error) {
        setMessage("Erro ao editar produto");
        setSeverity("error");
        setIsOpen(true);
        console.log(error);
      });
  }

  function closeSnackbar() {
    setIsOpen(false);
  }

  console.log(itCor);
  return (
    <div>
      <Header />
      <br />
      <nav className="link">
        <br />
        <Link to="../home">Home</Link>
        {"   >  "}
        <Link to="../Editar">Editar Produto</Link>
      </nav>

      <h2 className="h">Editar Produtos</h2>

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
            id="outlined-adornment-amount"
            variant="outlined"
            value={valor ?? ""}
            onChange={opcoesValor}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
            label="Valor"
            required
          />
          <br />
          <br />
          <FormControl sx={{ width: "20ch" }}>
            <InputLabel id="demo-simple-select-readonly-label">Cor</InputLabel>
            <Select
              className="campo"
              labelId="demo-simple-select-readonly-label"
              id="demo-simple-select-readonly"
              value={cor}
              onChange={opcoesCor}
              required
            >
              {itCor.map((it) => {
                return <MenuItem value={it.id}>{it.nome}</MenuItem>;
              })}
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
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />
          <br />
          <br />
          <input className="addimg" type="file" onChange={handleFile} />
          <img src={tipo + imagem} alt="adicionar foto" />
        
          <br />
          <br />
          <br />

          <button className="bootao" type="submit">
            SALVAR PRODUTO
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
