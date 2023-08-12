import React from "react";
import { useState, useEffect } from "react";
import "./Card.css";

const Card = ({ pokemon }) => {
  const [pokemonName, setPokemonName] = useState([]);
  const [pokemonType, setPokemonType] = useState("");
  const [pokemonAbility, setPokemonAbility] = useState("");

  let pokemonNameDetail = pokemon.species.url;
  const loadPokemonName = async (data) => {
    let response = await fetch(data);
    let result = await response.json();
    let jaName = result.names.find((name) => name.language.name === "ja").name;
    setPokemonName(jaName);
  };

  let resPokemonTypes = pokemon.types.map((v) => {
    let typesURL = v.type.url;
    return typesURL;
  });

  const fetchJapaneseTypeName = async (url) => {
    let response = await fetch(url);
    let typeData = await response.json();

    if (typeData.names && typeData.names.length > 0) {
      let jaTypeName = typeData.names.find(
        (name) => name.language.name === "ja"
      );
      return jaTypeName ? jaTypeName.name : typeData.name;
    } else {
      return typeData.name;
    }
  };

  const loadPokemonType = async (data) => {
    let _pokemonType = await Promise.all(data.map(fetchJapaneseTypeName));
    let joinedTypes = _pokemonType.join(" / ");
    setPokemonType(joinedTypes);
  };

  let resPokemonAbility = pokemon.abilities.map((v) => {
    let abilityURL = v.ability.url;
    return abilityURL;
  });

  const fetchJapaneseAbility = async (url) => {
    let response = await fetch(url);
    let abilityData = await response.json();

    if (abilityData.names && abilityData.names.length > 0) {
      let jaAbilityName = abilityData.names.find(
        (name) => name.language.name === "ja"
      );
      return jaAbilityName ? jaAbilityName.name : abilityData.name;
    } else {
      return abilityData.name;
    }
  };

  const loadPokemonAbility = async (data) => {
    let _pokemonAbility = await Promise.all(data.map(fetchJapaneseAbility));
    let joinedAbility = _pokemonAbility.join(" / ");
    setPokemonAbility(joinedAbility);
  };

  useEffect(() => {
    loadPokemonType(resPokemonTypes);
    loadPokemonName(pokemonNameDetail);
    loadPokemonAbility(resPokemonAbility);
  }, []);

  return (
    <div className="card">
      <div className="cardImg">
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
      <h3 className="cardName">{pokemonName}</h3>
      <div className="cardType">
        <div>
          タイプ:
          <span className="typeName">{pokemonType}</span>
        </div>
      </div>
      <div className="cardInfo">
        <div className="cardData">
          <p className="title">重さ：{pokemon.weight}</p>
        </div>
        <div className="cardData">
          <p className="title">高さ：{pokemon.height}</p>
        </div>
        <div className="cardData">
          <p className="title">アビリティ：{pokemonAbility}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
