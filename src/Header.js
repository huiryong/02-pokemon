import "./Header.css";
import { useState } from "react";

const Header = () => {
  return (
    <>
      <div className="header">
        <h1>Pokemon</h1>
        <div className="line"></div>
        <p>ポケモンずかん</p>
      </div>
    </>
  );
};

export default Header;
