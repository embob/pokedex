import React from 'react';
import './preview-card.scss';
import { mapToColor } from '../../utils/utils';

function capitalise(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


export default function PreviewCard({ id, name, types }) {

  let count = 0;
  const colors = types.map((type) => mapToColor(type)).reduce((prev, curr) => {
    count += 1;
    return {
      ...prev,
      [`--color-${count}`]: `${curr}`
    }
  }, {});

  const typeIcons = types.map((type, index) => <img key={index} className={`preview-card__icon preview-card__icon--${type}`} src={`images/icons/${type}.svg`} alt={type} width={40} height={40} />);

  return (
    <div className="preview-card preview-card--gradient" style={colors}>
      <img loading="lazy" src={`images/${id}.png`} alt={name} width={200} height={200} />
      <div className="preview-card__number">{`${id.toString().padStart(3, "0")}`}</div>
      <h2 className="preview-card__name">{capitalise(name)}</h2>
      <div className="types">{typeIcons}</div>
    </div>
  )
}

