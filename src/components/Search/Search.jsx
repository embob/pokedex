import React, { useContext } from "react";
import { PokedexContext } from "../Pokedex/Pokedex";
import searchIcon from "./search.svg";
import { capitalise } from "../../utils/utils";
import "./search.scss";

export default function Search() {
  const { searchQuery, setSearchQuery, filterValue, setFilterValue, types, setFilteredList, setNoSearchResults } =
    useContext(PokedexContext);

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
        <div>
          <div className="search__clear" onClick={handleClick}>
            Clear search
          </div>
        </div>

      )}
    </div>
  );
}
