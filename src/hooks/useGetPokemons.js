import { useEffect, useState } from 'react';

import api from '../services/api';

export default function useGetPokemon(pageNumber, setReturned) {
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
      let route;
      let isRetorned = false;

      if (
        localStorage.getItem('pageHeight') &&
        localStorage.getItem('pageNumber')
      ) {
        route = `pokemon/?limit=${Number(
          localStorage.getItem('pageNumber')
        )}&offset=0`;

        isRetorned = true;
      } else {
        route = `pokemon/?limit=24&offset=${pageNumber}`;
      }

      const response = await api.get(route);

      if (!ignore) {
        const pokemonData = await getPokemonData(response.data.results);

        setHasMore(response.data.results.length > 0);
        setPokemons((prevPokemons) => {
          if (
            localStorage.getItem('pageHeight') &&
            localStorage.getItem('pageNumber') &&
            isRetorned
          ) {
            const pokemons = [...pokemonData];

            return pokemons;
          }

          const pokemons = [...prevPokemons, ...pokemonData];

          return pokemons;
        });
        setLoading(false);

        if (isRetorned) {
          setReturned(true);
        }
      }
    }

    getPokemonList();

    return () => {
      ignore = true;
    };
  }, [pageNumber, setReturned]);

  return {
    loading,
    pokemons,
    hasMore,
  };
}
