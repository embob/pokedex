import React, { useContext } from "react";
import Error from "../Error/Error";
import { ModalContext } from "../Modal/Modal";
import { getRandomNumbersArray } from "../../utils/utils";

import "./detail-card.scss";

export default function DetailCard() {
  const { data, status } = useContext(ModalContext);

  if (status === "error") return <Error />;
  if (status === "fetching") return <div>skeleton card</div>;

  const {
    damageRelations: { weakTo, immuneTo, resistantTo },
    description,
    genus,
    height,
    moves,
    name,
    types,
    weight,
  } = data;

  const a = getRandomNumbersArray(2, moves.length)


  return (
    <div className="detail-card">
      {weakTo}
      {immuneTo}
      {resistantTo}
      {description}
      {genus}
      {height}
      {name}
      {types}
      {weight}
    </div>
  );
}
