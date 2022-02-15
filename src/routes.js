import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";


import Home from "./pages/Home";
import {Cadastro} from "./pages/Cadastro";
import {Produtos} from "./pages/Produtos";
import {Editar} from "./pages/Editar";

const Rota = () => {
    return (
        <BrowserRouter>
        <Routes>
        <Route element = {<Home/>} path="/" exact/>
        <Route element= {<Cadastro/>} path="cadastro" />
        <Route element={<Produtos/>} path="produtos/:id"/>
        <Route element={<Editar/>} path="editar/:id"/>
        </Routes>
        </BrowserRouter>
    )
}
export default Rota;