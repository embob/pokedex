import React from "react";
import classNames from "classnames";
import Img from "../Img/Img";
import { formatName, setTypeIcons } from "../../utils/utils";
import "./detail-card-header.scss";

function EvolvesFromText({ name }) {
  const subtitleClasses = classNames({
    "detail-card-header__subtitle": true,
    "detail-card-header__subtitle--evolution": name,
  });
  return (
    <div className={subtitleClasses}>
      {name ? `Evolves from ${formatName(name)}` : "Basic Pokémon"}
    </div>
  );
}

function EvolvesFromImage({ id, name }) {
  return (
    <div className="detail-card-header__evolves-from-image">
      <Img src={`images/${id}.png`} alt={name} width={60} height={60} />
    </div>
  );
}

export default function DetailCardHeader({ evolvesFrom, hp, types, name }) {
  const nameClasses = classNames({
    "detail-card-header__name": true,
    "detail-card-header__name--evolution": evolvesFrom,
  });

  const { name: evolvesFromName, id: evolvesFromId } = { ...evolvesFrom };

  const typeIcons = setTypeIcons(types, 32);

  return (
    <div className="detail-card-header">
      {evolvesFromId && (
        <EvolvesFromImage name={evolvesFromName} id={evolvesFromId} />
      )}
      <EvolvesFromText name={evolvesFromName} />

      <div className="detail-card-header__main-text">
        <div className={nameClasses}>{formatName(name)}</div>
        <div className="detail-header__main-text-second">
          <span className="detail-card-header__hp">{`${hp} HP`}</span>
          <span className="detail-card-header__types">{typeIcons}</span>
        </div>
      </div>
    </div>
  );
}
