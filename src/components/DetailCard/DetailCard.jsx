import React, { useContext } from "react";
import Error from "../Error/Error";
import { ModalContext } from "../Modal/Modal";
import "./detail-card.scss";
import {
  setBackground,
  setTypeIcons,
  formatId,
  formatName,
  setRandomMoves,
} from "../../utils/utils";

export default function DetailCard() {
  const { data, status } = useContext(ModalContext);

  if (status === "error") return <Error />;
  if (status === "fetching") return <div>skeleton card</div>;

  const {
    damageRelations: { weakTo, immuneTo, resistantTo } = [],
    description,
    genus,
    height,
    name,
    types = [],
    weight,
    id,
    moves = [],
    evolvesFrom = {},
  } = data;

  const twoMoves = setRandomMoves(moves, 2);

  const typeIcons = setTypeIcons(types, 30);

  const { name: evolvesFromName, id: evolvesFromId } = { ...evolvesFrom };

  // const evolution = evolvesFrom ? Array.from(evolvesFrom) : null;
  // console.log(evolution);

  return (
    <div
      className="detail-card detail-card--gradient"
      style={setBackground(types)}
    >
      <div className="detail-card__header">
        <div>{formatName(name)}</div>
        <div>
          <span className="detail-card__id">{`#${formatId(id)}`}</span>
          {typeIcons}
        </div>
      </div>
      <div className="detail-card__image">
        {evolvesFromName && (
          <div className="detail-card__evolves-from">
            <img
              loading="lazy"
              src={`images/${evolvesFromId}.png`}
              alt={name}
              width={40}
              height={40}
            />
            <div>Evolves from {formatName(evolvesFromName)}</div>
          </div>
        )}
        <img
          loading="lazy"
          src={`images/${id}.png`}
          alt={name}
          width={200}
          height={200}
        />
      </div>
      <div className="detail-card__attributes">
        <span className="detail-card__genus">{genus}</span>
        <span className="detail-card__id">{`Height ${height}cm`}</span>
        <span className="detail-card__id">{`Weight ${weight}kg`}</span>
      </div>

      <div>
        {twoMoves.map(({ name, type, description }, index) => (
          <div key={index}>
            <span>
              <img
                className={`preview-card__icon preview-card__icon--${type}`}
                src={`images/icons/${type}.svg`}
                alt={type}
                title={type}
                width={30}
                height={30}
              />
            </span>
            <span>{formatName(name)}</span> <span>{description}</span>
          </div>
        ))}
      </div>

      <div className="detail-card__description">{description}</div>

      <div className="detail-card__damage-relations">
        <div>
          <span>Weaknesses</span>
          {setTypeIcons(weakTo, 30)}
        </div>
        <div>
          <span>Resistant to</span>
          {setTypeIcons(resistantTo, 30)}
        </div>
        {immuneTo.length > 0 && (
          <div>
            <span>Immune to</span>
            <span>{setTypeIcons(immuneTo, 30)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
