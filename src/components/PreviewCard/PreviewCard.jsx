import React, { useContext } from 'react';
import { mapToColor, capitalise } from '../../utils/utils';
import './preview-card.scss';
import { PokemonListContext } from "../Pokedex/Pokedex";

export default function PreviewCard({ id, name, types }) {

  let count = 0;
  const colors = types.map((type) => mapToColor(type)).reduce((prev, curr) => {
    count += 1;
    return {
      ...prev,
      [`--color-${count}`]: `${curr}`
    }
  }, {});

  const formattedName = name.split('-').map(word => capitalise(word)).join(' ');
  const typeIcons = types.map((type, index) => <img key={index} className={`preview-card__icon preview-card__icon--${type}`} src={`images/icons/${type}.svg`} alt={type} width={40} height={40} />);
  const { toggle } = useContext(PokemonListContext);
  return (
    <>
      <div className="preview-card preview-card--gradient" style={colors} onClick={toggle}>
        <img loading="lazy" src={`images/${id}.png`} alt={name} width={175} height={175} />
        <h2 className="preview-card__name">{formattedName} <span className="id">{`#${id.toString().padStart(3, "0")}`}</span></h2>
        <div className="types">{typeIcons}</div>
      </div>
    </>
  )
}

