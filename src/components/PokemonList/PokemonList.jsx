import React, { useEffect, useState } from "react";
import PreviewCard from "../PreviewCard/PreviewCard";
import { capitalise } from "../../utils/utils";
import NoResults from "../NoResults/NoResults";
import Loading from "../Loading/Loading";
// import Modal from "../Modal/Modal";
// import useModal from "../useModal";
import './pokemon-list.scss';

// move out
function getTypes(pokemon) {
  const typesSet = new Set();
  pokemon.map(({ types }) => types.map(type => typesSet.add(type)));
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
  const [errorMessage, setErrorMessage] = useState("");
  const [pokemon, setPokemon] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [types, setTypes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("")
  const [filterValue, setFilterValue] = useState("");
  const debouncedQuery = useDebouncedValue(searchQuery, 400);

  useEffect(() => {
    fetch("/.netlify/functions/pokemon")
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        setErrorMessage(`${response.status}`);
        throw new Error(`Request failed`);
      })
      .then(json => {
        setIsLoading(false);
        setPokemon(json);
        setFilteredList(json);
      })
      .catch(
        (error) => {
          setIsLoading(false);
          setError(true);
        }
      )
  }, [setPokemon, setFilteredList]);

  useEffect(() => {
    setTypes(getTypes(pokemon));
  }, [pokemon]);


  useEffect(() => {
    const typesFiltered = !filterValue ? pokemon : pokemon.filter(({ types }) => types.includes(filterValue));
    const namesFiltered = !searchQuery ? typesFiltered : typesFiltered.filter(({ name }) => {
      return name.includes(debouncedQuery.toLowerCase());
    });
    setFilteredList(namesFiltered);
  }, [pokemon, filterValue, searchQuery, debouncedQuery]);

  function handleClick(event) {
    event.preventDefault();
    setSearchQuery('');
    setFilterValue('');
  }

  if (isLoading) return <Loading/>
  if (error) return <div>I have errored {errorMessage}</div>

  return (

    <div className="pokedex">
      <header className="pokedex__header">
          <h1 className="pokedex__title">Pokédex</h1>
        <div className="pokedex__search">
          <input type="text" name="name" id="name" placeholder="Search by name..." value={searchQuery} onChange={(event) => {
            setSearchQuery(event.target.value);
          }} />

          <select onChange={(event) => {
            setFilterValue(event.target.value);
          }} aria-label="Filter Pokemon by Type"
          value={filterValue}>
            <option value="">Filter By Type</option>
            {types.map(type => <option value={type}>{capitalise(type)}</option>)}
          </select>

          { (searchQuery || filterValue) && <button onClick={handleClick}>Clear values</button>}
        </div>
      </header>

      <div className="pokemon-list">
        {filteredList.length > 0 ?
          filteredList.map(({ id, name, types }, index) => (
            <div className="pokemon-list__item" key={index}>
              <PreviewCard id={id} name={name} types={types} key={index} />
            </div>
          )) : <NoResults />}
      </div>
    </div>
  );
}

export default PokemonList;