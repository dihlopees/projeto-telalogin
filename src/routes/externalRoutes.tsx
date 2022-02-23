import Esqueci from "pages/Esqueci";
// import Home from "pages/Home";
import Login from "pages/Login";
import React from "react";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";

    

const RotaExterna = () => {
  

    return (
        <BrowserRouter>
        
        
        <Routes>
        <Route element={<Login/>} path="/login"/>
        <Route element={<Navigate to="/login"/>} path="*" />
        <Route element={<Esqueci/>} path="usuario/esqueci" />
        </Routes>


        </BrowserRouter>
    )
}
export default RotaExterna;