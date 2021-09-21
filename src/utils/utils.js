const colors = {
  bug: '#CAE48D',
  dark : '#C3BFCA',
  dragon: '#B0CCED',
  electric: '#FAE9A3',
  fairy: '#F7D0F4',
  fighting: '#F1CAD5',
  fire: '#F5B886',
  flying: '#C8D6EF',
  ghost: '#C8D6EF',
  grass: '#A5D8A0',
  ground: '#EAB294',
  ice: '#B9E6E0',
  normal: '#C8CCD0',
  poison: '#CFADE0',
  psychic: '#F9CBCE',
  rock: '#E2DAC5',
  steel: '#A6BEC9',
  water: '#99C0E7',
}

function mapToColor(type) {
  return colors[type];
}

function capitalise(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getTypes(pokemon) {
  const typesSet = new Set();
  pokemon.map(({ types }) => types.map((type) => typesSet.add(type)));
  return Array.from(typesSet);
}

function setBackground(types) {
  let count = 0;
  return types.map((type) => mapToColor(type)).reduce((prev, curr) => {
    count += 1;
    return {
      ...prev,
      [`--color-${count}`]: `${curr}`
    }
  }, {});
}

export { capitalise, getTypes, setBackground };