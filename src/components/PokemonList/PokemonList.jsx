import React, { useEffect, useState } from "react";
import PreviewCard from "../PreviewCard/PreviewCard";
import { capitalise } from "../../utils/utils";
import NoResults from "../NoResults/NoResults";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
// import Modal from "../Modal/Modal";
// import useModal from "../useModal";
import "./pokemon-list.scss";
import Search from "../Search/Search";


const PokemonListContext = React.createContext();

// move out
function getTypes(pokemon) {
  const typesSet = new Set();
  pokemon.map(({ types }) => types.map((type) => typesSet.add(type)));
  return Array.from(typesSet);
}

function useDebouncedValue(value, wait) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedValue(value), wait);
    return () => clearTimeout(id);
  }, [value, wait]);

  return debouncedValue;
}

function PokemonList() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [types, setTypes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const debouncedQuery = useDebouncedValue(searchQuery, 400);

  useEffect(() => {
    fetch("/.netlify/functions/pokemon")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(`Request failed`);
      })
      .then((json) => {
        setIsLoading(false);
        setPokemon(json);
        setFilteredList(json);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(true);
      });
  }, [setPokemon, setFilteredList]);

  useEffect(() => {
    setTypes(getTypes(pokemon));
  }, [pokemon]);

  useEffect(() => {
    const typesFiltered = !filterValue
      ? pokemon
      : pokemon.filter(({ types }) => types.includes(filterValue));
    const namesFiltered = !searchQuery
      ? typesFiltered
      : typesFiltered.filter(({ name }) => {
          return name.includes(debouncedQuery.toLowerCase());
        });
    setFilteredList(namesFiltered);
  }, [pokemon, filterValue, searchQuery, debouncedQuery]);

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <PokemonListContext.Provider value={{searchQuery, setSearchQuery, filterValue, setFilterValue, filteredList, setFilteredList, types, setTypes}}>
    <div className="pokedex">
      <header className="pokedex__header">
        <h1 className="pokedex__title">Pokédex</h1>
        <Search />
      </header>

      <div className="pokemon-list">
        {filteredList.length > 0 ? (
          filteredList.map(({ id, name, types }, index) => (
            <div className="pokemon-list__item" key={index}>
              <PreviewCard id={id} name={name} types={types} key={index} />
            </div>
          ))
        ) : (
          <NoResults />
        )}
      </div>
    </div>
    </PokemonListContext.Provider>
  );
}

export { PokemonList, PokemonListContext};
