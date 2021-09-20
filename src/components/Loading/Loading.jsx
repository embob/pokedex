import "./loading.scss";
import pokeball from "./images/poke-ball.png";
import greatball from "./images/great-ball.png";
import ultraball from "./images/ultra-ball.png";

export default function Loading() {
  return (
    <div className="loading">
      <span className="loading__inner-wrapper">
        {/* <span className="loading__text">Loading</span> */}
        <span className="loading__animation">
          <span className="ball ball-1">
            <img src={pokeball} alt="|" width="100" height="100"></img>
          </span>
          <span className="ball ball-2">
            <img src={greatball} alt="|" width="100" height="100"></img>
          </span>
          <span className="ball ball-3">
            <img src={ultraball} alt="|" width="100" height="100"></img>
          </span>
        </span>
      </span>
    </div>
  );
}
