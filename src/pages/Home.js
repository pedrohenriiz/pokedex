import { useCallback, useRef, useState, useEffect } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { Header } from '../components/Header';
import { Loading } from '../components/Loading';

import useGetPokemon from '../hooks/useGetPokemons';
import { HomePageCard } from '../components/Cards/HomePageCard';

export function Home() {
  const [pageNumber, setPageNumber] = useState(0);
  const [returned, setReturned] = useState(false);

  const { pokemons, hasMore, loading } = useGetPokemon(pageNumber, setReturned);
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
            let increasePageNumber;

            if (
              localStorage.getItem('pageHeight') &&
              localStorage.getItem('pageNumber')
            ) {
              increasePageNumber = Number(localStorage.getItem('pageNumber'));

              localStorage.removeItem('pageHeight');
              localStorage.removeItem('pageNumber');
            } else {
              increasePageNumber = previousPageNumber + 24;
            }

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

  useEffect(() => {
    if (
      localStorage.getItem('pageHeight') &&
      localStorage.getItem('pageNumber') &&
      returned
    ) {
      setTimeout(() => {
        window.scroll(0, Number(localStorage.getItem('pageHeight')));
      }, 500);
    }
  }, [returned]);

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
                  pageNumber={pageNumber}
                />
              );
            }

            return (
              <HomePageCard
                key={uuidv4()}
                pokemon={poke}
                pageNumber={pageNumber}
              />
            );
          })}
        </div>

        {loading && <Loading />}
      </div>
    </div>
  );
}
