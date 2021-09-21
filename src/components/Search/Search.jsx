import React, { useContext } from "react";
import { PokemonListContext } from "../PokemonList/PokemonList";
import searchIcon from "./search.svg";
import { capitalise } from "../../utils/utils";

export default function Search() {
  const { searchQuery, setSearchQuery, filterValue, setFilterValue, types } =
    useContext(PokemonListContext);

  function handleClick(event) {
    event.preventDefault();
    setSearchQuery("");
    setFilterValue("");
  }
  return (
    <div className="pokedex__search">
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={(event) => {
          setSearchQuery(event.target.value);
        }}
        style={{ backgroundImage: `url(${searchIcon})` }}
      />

      <select
        onChange={(event) => {
          setFilterValue(event.target.value);
        }}
        aria-label="Filter Pokemon by Type"
        value={filterValue}
      >
        <option value="">Filter By Type</option>
        {types.map((type) => (
          <option key={type} value={type}>{capitalise(type)}</option>
        ))}
      </select>

      {(searchQuery || filterValue) && (
        <div className="pokedex__clear-search" onClick={handleClick}>
          Clear search
        </div>
      )}
    </div>
  );
}
