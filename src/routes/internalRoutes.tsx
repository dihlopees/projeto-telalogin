import { Cadastro } from "pages/Cadastro";
import { Editar } from "pages/Editar";
import Home from "pages/Home";
import { Produtos } from "pages/Produtos";
import React from "react";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";

const RotaInterna = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="home" />
        <Route element={<Cadastro />} path="cadastro" />
        <Route element={<Produtos />} path="produtos/:id" />
        <Route element={<Editar />} path="editar/:id" />
        <Route element={<Navigate to="/home" />} path="*" />
      </Routes>
    </BrowserRouter>
  );
};
export default RotaInterna;
