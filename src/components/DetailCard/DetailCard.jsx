import React, { useContext } from "react";
import Error from "../Error/Error";
import { ModalContext } from "../Modal/Modal";
import "./detail-card.scss";
import { setBackground, setTwoRandomMoves } from "../../utils/utils";
import Img from "../Img/Img";
import Moves from "../Moves/Moves";
import DetailCardHeader from "../DetailCardHeader/DetailCardHeader";
import DamageRelations from "../DamageRelations/DamageRelations";
import SkeletonCard from "../SkeletonCard/SkeletonCard";

export default function DetailCard() {
  const { data, status } = useContext(ModalContext);

  if (status === "error") return <Error />;
  if (status === "fetching") return <SkeletonCard />;

  const {
    damageRelations = {},
    description,
    genus,
    height,
    name,
    types = [],
    weight,
    id,
    moves = [],
    evolvesFrom = {},
    hp,
  } = data;

  const firstType = types[0];
  const collectedMoves = moves.length > 1 ? setTwoRandomMoves(moves, 2) : moves;

  return (
    <div
      className="detail-card detail-card--gradient"
      style={setBackground(types)}
    >
      <div className="detail-card__first">
        <DetailCardHeader
          evolvesFrom={evolvesFrom}
          hp={hp}
          types={types}
          name={name}
        />
        <div className={`detail-card__image detail-card__image--${firstType}`}>
          <Img src={`images/${id}.png`} alt={name} width={200} height={200} />
        </div>
        <div className="detail-card__attributes">
          {`${genus}. Ht: ${height}cm, Wt: ${weight}kg.`}
        </div>
      </div>
      <div className="detail-card__second">
        <div className="detail-card__moves">
          {collectedMoves.length > 0 && <Moves moves={collectedMoves} />}
        </div>

        <DamageRelations damageRelations={damageRelations} />

        <div className="detail-card__description">{`${description} #${id}`}</div>
      </div>
    </div>
  );
}
