const { MongoClient } = require('mongodb');
require('dotenv').config();

let client = new MongoClient(process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true });
const clientPromise = client.connect();

exports.handler = async (event, context) => {
  client = await clientPromise;
  const pokemon = client.db().collection('pokemon');

  const getPokemonList = async () => {
    return pokemon.find({}, {
      projection: {
        id: 1, name: 1, types: 1, _id: 0,
      },
    }).sort({"id":1}).toArray();
  };

  const getPokemon = async (id) => {
    return pokemon.findOne({ id: Number(id) }, {
      projection: {
        _id: 0,
      },
    });
  };

  const path = event.path.replace(/\/\.netlify\/functions\/[^/]*(\/|)/, '');
  const pathParts = (path) ? path.split('/') : [];

  const result = await (pathParts.length > 0 ? getPokemon(pathParts[0]) : getPokemonList());
  return {
    'statusCode': 200,
    'headers': {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
    },
    'body': JSON.stringify(result)
  }
};