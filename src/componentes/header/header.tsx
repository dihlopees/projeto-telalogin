import Logo from "./logo.svg";
import "./header.css";
import React from "react";

function Header() {
  return (
    <div className="App-header">
      <img src={Logo} alt="logo" />
    </div>
  );
}

export default Header;
