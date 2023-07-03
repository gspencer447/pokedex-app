import React, { useState, useEffect } from "react";
import fetchPokemon from "./data/pokeFetch";
import './styles.css'

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedWeakness, setSelectedWeakness] = useState('');

  //fetches the data from API
  useEffect(() => {
    fetchPokemon()
      .then((data) => {
        setPokemonData(data); 
      })
      .catch((error) => {
        console.error('Error fetching Pokemon data:', error);
      });
  }, []);
//---------------------------------------

//holds the filtered pokemon based on the current search and filters
  const filteredPokemon = pokemonData
    .filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((pokemon) => selectedType ? pokemon.type.includes(selectedType) : true)
    .filter((pokemon) => selectedWeakness ? pokemon.weaknesses.includes(selectedWeakness) : true);
    //----------------------------------------------------------------

    //holds an array of unique types and weaknesses
  const uniqueTypes = Array.from(new Set(pokemonData.flatMap((pokemon) => pokemon.type)));
  const uniqueWeaknesses = Array.from(new Set(pokemonData.flatMap((pokemon) => pokemon.weaknesses)));
//set and flatmap used to get all types without duplicates
//--------------------------------------------

  return (
    <div className="app-container">
      <h1>Pokedex</h1>
      <div className="container">
        <input
          type="text"
          placeholder="Search Pokemon"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input"
        />
        <h3>Filter Options:</h3>
        <div>
          <h4>Type:</h4>
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            <option value="">All Types</option>
            {uniqueTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h4>Weakness:</h4>
          <select value={selectedWeakness} onChange={(e) => setSelectedWeakness(e.target.value)}>
            <option value="">All Weaknesses</option>
            {uniqueWeaknesses.map((weakness) => (
              <option key={weakness} value={weakness}>
                {weakness}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="pokemon-grid">
        {filteredPokemon.length > 0 ? (
          filteredPokemon.map((pokemon) => (
            <div key={pokemon.id} className="pokemon-card">
              <img src={pokemon.img} alt={pokemon.name} className="pokemon-image" />
              <h3>{pokemon.name}</h3>
              <p>Number: {pokemon.num}</p>
              <p>Type: {pokemon.type.join(', ')}</p>
              <p>Weaknesses: {pokemon.weaknesses.join(', ')}</p>
            </div>
          ))
        ) : (
          <p>No Pokemon found.</p>
        )}
      </div>
    </div>
  );
};

export default App;
