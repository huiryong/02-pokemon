import "./Header.css";
import { useState } from "react";

const Header = () => {
  const [input, setInput] = useState();

  const inputVal = (e) => {
    setInput(e.target.value);
  };

  return (
    <>
      <div className="header">
        <h1>Pokemon</h1>
        <div className="input">
          <p>けんさく</p>
          <input onChange={inputVal} />
        </div>
      </div>
    </>
  );
};

export default Header;
