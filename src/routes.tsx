import React, { useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";


import Home from "./pages/Home";
import {Cadastro} from "./pages/Cadastro";
import {Produtos} from "./pages/Produtos";
import {Editar} from "./pages/Editar";
import Login from "./pages/Login";

const Rota = () => {
    const[protecao, setProtecao] = useState(false)

    return (
        <BrowserRouter>
        {protecao ?
        
        <Routes>
        <Route element = {<Login/>} path="/"/>
        <Route element = {<Home/>} path="home"/>
        <Route element= {<Cadastro/>} path="cadastro" />
        <Route element={<Produtos/>} path="produtos/:id"/>
        <Route element={<Editar/>} path="editar/:id"/>
        </Routes>

        :
        <Routes>
        <Route element={<Login setRota={setProtecao}/>} path="*" />
        </Routes>}
        </BrowserRouter>
    )
}
export default Rota;