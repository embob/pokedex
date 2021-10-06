import React, { useEffect, useState } from "react";
import { getTypes } from "../../utils/utils";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import PokemonList from "../PokemonList/PokemonList";
import { Modal } from "../Modal/Modal";
import useModal from "../useModal";
import "./pokedex.scss";
import Search from "../Search/Search";
import backgroundImages from "../DetailCard/images";

const PokedexContext = React.createContext();

function Pokedex() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [types, setTypes] = useState([]);
  const [noSearchResults, setNoSearchResults] = useState(false);
  const [cardClicked, setCardClicked] = useState(null);

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
      .catch(() => {
        setIsLoading(false);
        setError(true);
      });
  }, []);

  useEffect(() => {
    if (pokemon) {
      setTypes(getTypes(pokemon));
    }
  }, [pokemon]);

  useEffect(() => {
    if (types) {
      types.forEach((type) => {
        const newImage = new Image();
        newImage.src = `images/icons/${type}.svg`;
        window[`images/icons/${type}.svg`] = newImage;
      });
    }
  }, [types]);

  useEffect(() => {
    backgroundImages.forEach((img) => {
      const newBackgroundImage = new Image();
      newBackgroundImage.src = img;
      window[img] = newBackgroundImage;
    });
  }, [])

  const { isShowing, toggle } = useModal();

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <PokedexContext.Provider
      value={{
        types,
        filteredList,
        setFilteredList,
        toggle,
        pokemon,
        noSearchResults,
        setNoSearchResults,
        cardClicked,
        setCardClicked,
        isShowing,
      }}
    >
      <div className="pokedex">
        <header className="pokedex__header">
          <h1 className="pokedex__title">Pokédex</h1>
          <Search />
        </header>

        <PokemonList />
      </div>

      <Modal />
    </PokedexContext.Provider>
  );
}

export { Pokedex, PokedexContext };
