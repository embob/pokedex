import "./error.scss";

export default function Error() {
  return (
    <div className="error">
      <span className="error__inner-wrapper">
        <span className="error__text">Something went wrong!!</span>
        <img src={`images/54.png`} alt="Pokemon" width={300} height={300} />
      </span>
    </div>
  );
}