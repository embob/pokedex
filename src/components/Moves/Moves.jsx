import React from "react";
import Img from "../Img/Img";
import { formatName } from "../../utils/utils";
import "./moves.scss";

export default function Moves({ moves }) {
  return moves.map(({ name, type, description }, index) => (
    <div className="move" key={index}>
      <div className="move__icon">
        <Img
          src={`images/icons/${type}.svg`}
          alt={type}
          title={type}
          width={32}
          height={32}
        />
      </div>

      <div className="move__text">
        <span className="move__name">{formatName(name)}</span>{" "}
        {description}
      </div>
    </div>
  ));
}
