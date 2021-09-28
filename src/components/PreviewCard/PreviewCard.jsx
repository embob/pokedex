import React, { useContext } from "react";
import { formatName, setTypeIcons, setBackground, formatId } from "../../utils/utils";
import "./preview-card.scss";
import { PokedexContext } from "../Pokedex/Pokedex";

export default function PreviewCard({ id, name, types }) {

  const typeIcons = setTypeIcons(types, 40);

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
        <h2 className="preview-card__name">
          {formatName(name)}{" "}
          <span className="id">{`#${formatId(id)}`}</span>
        </h2>
        <div className="types">{typeIcons}</div>
      </div>
    </>
  );
}
