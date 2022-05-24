import { useEffect, useState } from 'react';

import api from '../services/api';

// TODO: Adicionar try catch
export default function useGetPokemon(pageNumber) {
  const [loading, setLoading] = useState(true);
  const [pokemons, setPokemons] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);

    let ignore = false;

    async function getPokemonData(results) {
      const pokeList = [];

      for (let i = 0; i < results.length; i++) {
        const response = await api.get(results[i].url);

        pokeList.push(response.data);
      }

      return pokeList;
    }

    async function getPokemonList() {
      const response = await api.get(`pokemon/?limit=20&offset=${pageNumber}`);

      if (!ignore) {
        const pokemonData = await getPokemonData(response.data.results);

        setHasMore(response.data.results.length > 0);
        setPokemons((prevPokemons) => [...prevPokemons, ...pokemonData]);
        setLoading(false);
      }
    }

    getPokemonList();

    return () => {
      ignore = true;
    };
  }, [pageNumber]);

  return {
    loading,
    pokemons,
    hasMore,
  };
}
