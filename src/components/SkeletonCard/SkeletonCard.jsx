import React from "react";
import "./skeleton-card.scss";
import classNames from "classnames";

export default function SkeletonCard({ loading, error }) {
  const classes = classNames({
    "skeleton-card": true,
    "skeleton-card--loading": loading,
    "skeleton-card--error": error,
  });
  return (
    <div className={classes}>
      {error && (
        <div className="skeleton-card__error">
          Something went wrong
        </div>
      )}
    </div>
  );
}
