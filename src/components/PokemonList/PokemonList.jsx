import React, { useEffect, useState } from "react";
import PreviewCard from "../PreviewCard/PreviewCard";
import { capitalise } from "../../utils/utils";
import './pokemon-list.scss';

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

function NoResults() {
  return (
    <div className="no-results">
      <img src={`images/54.png`} alt="Pokemon" width={300} height={300} />
      <div>Oh!! No Pokémon exist for this search</div>
    </div>
  )
}

function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [types, setTypes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("")
  const [filterValue, setFilterValue] = useState("");
  const debouncedQuery = useDebouncedValue(searchQuery, 400);

  useEffect(() => {
    fetch("http://localhost:8765/api/pokemon")
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request failed');
      })
      .then(json => {
        setPokemon(json);
        setFilteredList(json);
      })
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