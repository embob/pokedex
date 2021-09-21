import React, { useContext} from 'react';
import { PokemonListContext } from "../PokemonList/PokemonList";
import PreviewCard from "../PreviewCard/PreviewCard";
import NoResults from "../NoResults/NoResults";
import "./filtered-list.scss";

export default function FilteredList() {
  const { filteredList } =
  useContext(PokemonListContext);
  return (
    <div>FilteredList
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
  )
}