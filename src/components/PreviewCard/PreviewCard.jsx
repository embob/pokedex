import React, { useContext } from "react";
import { formatName, setBackground, formatId } from "../../utils/utils";
import "./preview-card.scss";
import { PokedexContext } from "../Pokedex/Pokedex";

export default function PreviewCard({ id, name, types }) {

  const { toggle, setCardClicked } = useContext(PokedexContext);

  function handleClick(event) {
    setCardClicked(id);
    toggle();
  }

  return (
    <>
      <div
        className="preview-card preview-card--gradient"
        style={setBackground(types)}
        onClick={handleClick}
      >
        <img
          className="preview-card__image"
          loading="lazy"
          src={`images/${id}.png`}
          alt={name}
          width={175}
          height={175}
        />
        <div className="preview-card__name">
          {formatName(name)}{" "}
          <span className="id">{`#${formatId(id)}`}</span>
        </div>
      </div>
    </>
  );
}
