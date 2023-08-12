import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon.js";
import Card from "./componenets/Card/Card";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loding, setLoding] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      let res = await getAllPokemon(initialURL);

      loadPokemon(res.results);
      setNextURL(res.next);
      setPrevURL(res.previous);
      setLoding(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecode = getPokemon(pokemon.url);
        return pokemonRecode;
      })
    );
    setPokemonData(_pokemonData);
  };

  const handleNextPage = async () => {
    setLoding(true);
    let data = await getAllPokemon(nextURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoding(false);
  };

  const handlePrevPage = async () => {
    if (!prevURL) return;
    setLoding(true);
    let data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setPrevURL(data.previous);
    setLoding(false);
  };

  return (
    <div className="App">
      {loding ? (
        <h1>ロード中・・・</h1>
      ) : (
        <div className="pokemonCardContainer">
          {pokemonData.map((pokemon, i) => {
            return <Card key={i} pokemon={pokemon} />;
          })}
        </div>
      )}
      <div className="btn">
        <button onClick={handlePrevPage}>まえへ</button>
        <button onClick={handleNextPage}>つぎへ</button>
      </div>
    </div>
  );
}

export default App;
