import './no-results.scss';

export default function NoResults() {
  return (
    <div className="no-results">
      <span className="no-results__inner-wrapper">
        <div className="no-results__text">No Pokémon exist for this search</div>
        <img src={`images/51.png`} alt="Pokemon" width={300} height={300} />
      </span>
    </div>
  )
}