import React, { useState, useEffect } from "react";
import fetchPokemon from "./data/pokeFetch";

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    fetchPokemon()
      .then((data) => {
        setPokemonData(data);
        // console.log('Fetched data:', data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Pokedex</h1>
      {pokemonData.map((pokemon) => (
        <div key={pokemon.id}>
          <h3>{pokemon.name}</h3>
          <p>Number: {pokemon.num}</p>
          <p>Type: {pokemon.type.join(", ")}</p>
          <p>Weaknesses: {pokemon.weaknesses.join(", ")}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default App;
