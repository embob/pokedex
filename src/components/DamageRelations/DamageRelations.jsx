import React from "react";
import { setTypeIcons } from "../../utils/utils";
import "./damage-relations.scss";
import classNames from "classnames";

export default function DamageRelations({ damageRelations }) {


  const { weakTo = [], resistantTo = [], immuneTo = [] } = damageRelations;
  const classes = classNames({
    "damage-relations": true,
    "damage-relations--with-immunity": immuneTo.length > 0,
  });
  return (
    <div className={classes}>
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
