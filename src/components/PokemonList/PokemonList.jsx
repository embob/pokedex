import React, { useContext } from "react";
import { PokedexContext } from "../Pokedex/Pokedex";
import PreviewCard from "../PreviewCard/PreviewCard";
import NoResults from "../NoResults/NoResults";
import "./pokemon-list.scss";

export default function PokemonList() {
  const { pokemon, filteredList, noSearchResults } = useContext(PokedexContext);

  if (noSearchResults) return <NoResults />
  let list = [];
  filteredList.length > 0 ? list = [...filteredList] : list = [...pokemon];
  return (
    <div>
      <div className="pokemon-list">
        {list.map(({ id, name, types }, index) => (
            <div className="pokemon-list__item" key={index}>
              <PreviewCard id={id} name={name} types={types} key={index} />
            </div>
          ))}
      </div>
    </div>
  );
}
