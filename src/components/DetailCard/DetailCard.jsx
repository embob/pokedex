import React, { useContext } from "react";
import Error from "../Error/Error";
import { ModalContext } from "../Modal/Modal";
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
    name,
    types,
    weight,
  } = data;

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
