import React from "react";
import { setTypeIcons } from "../../utils/utils";
import "./damage-relations.scss";

export default function DamageRelations({ damageRelations }) {
  const { weakTo = [], resistantTo = [], immuneTo = [] } = damageRelations;
  return (
    <div className="damage-relations">
      <div>
        <div className="damage-relation__label">weakness</div>
        <div className="damage-relation__icons">{setTypeIcons(weakTo, 26)}</div>
      </div>

      <div>
        <div className="damage-relation__label">resistance</div>
        <div className="damage-relation__icons">
          {setTypeIcons(resistantTo, 26)}
        </div>
      </div>

      {immuneTo.length > 0 && (
        <div>
          <div className="damage-relation__label">immunity</div>
          <div className="damage-relation__icons">
            {setTypeIcons(immuneTo, 26)}
          </div>
        </div>
      )}
    </div>
  );
}
