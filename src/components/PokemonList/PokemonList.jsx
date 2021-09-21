import React, { useContext } from "react";
import { PokedexContext } from "../Pokedex/Pokedex";
import PreviewCard from "../PreviewCard/PreviewCard";
import NoResults from "../NoResults/NoResults";
import "./pokemon-list.scss";

export default function PokemonList() {
  const { filteredList } = useContext(PokedexContext);

  return (
    <div>
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
  );
}
