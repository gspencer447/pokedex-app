const fetchPokemon = () => {
    return fetch(
      'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json'
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching Pokemon data: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        return data.pokemon;
      })
      .catch((error) => {
        console.error('Error fetching Pokemon data:', error);
        return [];
      });
  };
  
  export default fetchPokemon;
  