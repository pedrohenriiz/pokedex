import { useCallback, useRef, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { Header } from '../components/Header';
import { Loading } from '../components/Loading';

import useGetPokemon from '../hooks/useGetPokemons';
import { HomePageCard } from '../components/Cards/HomePageCard';

// TODO: Ver depois sobre position do scroll https://stackoverflow.com/questions/44970279/how-do-people-handle-scroll-restoration-with-react-router-v4
export function Home() {
  const [pageNumber, setPageNumber] = useState(0);

  const { pokemons, hasMore, loading } = useGetPokemon(pageNumber);
  const observer = useRef();

  const lastPokemonElementRef = useCallback(
    (node) => {
      if (loading) {
        return;
      }

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((previousPageNumber) => {
            const increasePageNumber = previousPageNumber + 30;

            return increasePageNumber;
          });
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );

  return (
    <div className='bg-gray-100 min-h-screen h-full'>
      <div className='container mx-auto px-4 flex flex-col '>
        <Header />

        <div className='mt-12 place-items-center grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {pokemons.map((poke, index) => {
            if (pokemons.length === index + 1) {
              return (
                <HomePageCard
                  key={uuidv4()}
                  pokemon={poke}
                  lastPokemonElementRef={lastPokemonElementRef}
                />
              );
            }

            return <HomePageCard key={uuidv4()} pokemon={poke} />;
          })}
        </div>

        {loading && <Loading />}
      </div>
    </div>
  );
}
