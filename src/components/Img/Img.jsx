import React from "react";

export default function Img({src, alt, width, height, title }) {
  return (
    <img
      loading="lazy"
      src={src}
      alt={alt}
      width={width}
      height={height}
      title={title}
    />
  );
}
