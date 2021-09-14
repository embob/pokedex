import React, { useEffect, useState } from "react";
import PreviewCard from "../PreviewCard/PreviewCard";
import './pokemon-list.scss';

function Pokemons() {
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8765/api/pokemon")
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request failed');
      })
      .then(json => {
        setPokemons(json)
      })
  }, [setPokemons]);


  return (
    <div className="pokemon-list">
      {pokemons.map(pokemon => (
        <div className="pokemon-list__item">
          <PreviewCard key={pokemon.id} id={pokemon.id} name={pokemon.name} types={pokemon.types} />
        </div>
      ))}
    </div>
  );
}

export default Pokemons;