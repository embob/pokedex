import './no-results.scss';

export default function NoResults() {
  return (
    <div className="no-results">
      <img src={`images/54.png`} alt="Pokemon" width={300} height={300} />
      <div>Oh!! No Pokémon exist for this search</div>
    </div>
  )
}