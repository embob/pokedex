import React, { useContext } from "react";
import { PokemonListContext } from "../Pokedex/Pokedex";
import searchIcon from "./search.svg";
import { capitalise } from "../../utils/utils";
import "./search.scss";

export default function Search() {
  const { searchQuery, setSearchQuery, filterValue, setFilterValue, types } =
    useContext(PokemonListContext);

  function handleClick(event) {
    event.preventDefault();
    setSearchQuery("");
    setFilterValue("");
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
        style={{ backgroundImage: `url(${searchIcon})` }}
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
        <div className="search__clear" onClick={handleClick}>
          Clear search
        </div>
      )}
    </div>
  );
}
