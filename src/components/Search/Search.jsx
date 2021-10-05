import React, { useContext, useEffect, useState } from "react";
import { PokedexContext } from "../Pokedex/Pokedex";
import { capitalise } from "../../utils/utils";
import "./search.scss";

export default function Search() {
  const {
    types,
    setFilteredList,
    setNoSearchResults,
    pokemon
  } = useContext(PokedexContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    if (!filterValue && !searchQuery) {
      setNoSearchResults(false);
      setFilteredList([]);
      return;
    }
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
  }, [pokemon, filterValue, searchQuery, setFilteredList, setNoSearchResults]);

  function handleClick(event) {
    event.preventDefault();
    setSearchQuery("");
    setFilterValue("");
    setFilteredList([]);
    setNoSearchResults(false);
  }

  return (
    <div className="search">
      <input
        className="search__text"
        type="text"
        name="name"
        id="name"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={(event) => {
          setSearchQuery(event.target.value);
        }}
      />

      <select
        className="search__select"
        onChange={(event) => {
          setFilterValue(event.target.value);
        }}
        aria-label="Filter Pokemon by Type"
        value={filterValue}
      >
        <option value="">Filter By Type</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {capitalise(type)}
          </option>
        ))}
      </select>

      {(searchQuery || filterValue) && (
        <div className="search__clear-wrapper">
          <div className="search__clear" onClick={handleClick}>
            Clear search
          </div>
        </div>
      )}
    </div>
  );
}
