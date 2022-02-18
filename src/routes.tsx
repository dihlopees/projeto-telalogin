import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";


import Home from "./pages/Home";
import {Cadastro} from "./pages/Cadastro";
import {Produtos} from "./pages/Produtos";
import {Editar} from "./pages/Editar";
import Login from "./pages/Login";

const Rota = () => {
    return (
        <BrowserRouter>
        <Routes>
        <Route element = {<Login/>} path="/"/>
        <Route element = {<Home/>} path="/home"/>
        <Route element= {<Cadastro/>} path="cadastro" />
        <Route element={<Produtos/>} path="produtos/:id"/>
        <Route element={<Editar/>} path="editar/:id"/>
        </Routes>
        </BrowserRouter>
    )
}
export default Rota;