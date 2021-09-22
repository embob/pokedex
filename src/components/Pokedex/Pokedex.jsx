import React, { useEffect, useState } from "react";
import { getTypes } from "../../utils/utils";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import PokemonList from "../PokemonList/PokemonList";
import Modal from "../Modal/Modal";
import useModal from "../useModal";
import "./pokedex.scss";
import Search from "../Search/Search";

const PokedexContext = React.createContext();

function Pokedex() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const [pokemonDetail, setPokemonDetail] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [types, setTypes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [noSearchResults, setNoSearchResults] = useState(false);

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
      })
      .catch((error) => {
        setIsLoading(false);
        setError(true);
      });
  }, []);

  useEffect(() => {
    setTypes(getTypes(pokemon));
  }, [pokemon]);

  useEffect(() => {
    if (!filterValue && !searchQuery) return;
    const typesFiltered = !filterValue
      ? pokemon
      : pokemon.filter(({ types }) => types.includes(filterValue));
    const namesFiltered = !searchQuery
      ? typesFiltered
      : typesFiltered.filter(({ name }) => {
          return name.includes(searchQuery.toLowerCase());
        });
    if (namesFiltered.length === 0) setNoSearchResults(true);
    setFilteredList(namesFiltered);
  }, [pokemon, filterValue, searchQuery]);

  const { isShowing, toggle, setId, cardClicked } = useModal();

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <PokedexContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        filterValue,
        setFilterValue,
        types,
        filteredList,
        setFilteredList,
        toggle,
        setId,
        pokemon,
        noSearchResults,
        setNoSearchResults,
        pokemonDetail,
        setPokemonDetail,
      }}
    >
      <div className="pokedex">
        <header className="pokedex__header">
          <h1 className="pokedex__title">Pokédex</h1>
          <Search />
        </header>

        <PokemonList />
      </div>

      <Modal isShowing={isShowing} hide={toggle} id={cardClicked} />
    </PokedexContext.Provider>
  );
}

export { Pokedex, PokedexContext };
