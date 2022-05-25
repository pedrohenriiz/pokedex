import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import api from '../services/api';

import { Header } from '../components/Header';
import { PokemonDetailImage } from '../components/Cards/PokemonDetailImage';
import { DetailTypes } from '../components/DetailTypes';
import { DetailStats } from '../components/DetailStats';
import { Loading } from '../components/Loading';

export function Detail() {
  const { id } = useParams();

  const [pokemonData, setPokemonData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getPokemonDetail() {
      try {
        setIsLoading(true);
        const response = await api.get(`pokemon/${id}`);
        setPokemonData(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }

    getPokemonDetail();
  }, [id]);

  return (
    <div className='bg-gray-100 min-h-screen h-full'>
      <div className='container mx-auto px-4 flex flex-col items-center'>
        <Header />

        {!isLoading ? (
          <>
            <PokemonDetailImage
              name={pokemonData.name}
              sprite={
                pokemonData.sprites?.other['official-artwork']?.front_default
              }
            />
            <DetailTypes name={pokemonData.name} types={pokemonData.types} />

            <h2 className='mt-10 font-bold uppercase text-lg text-gray-700'>
              Stats
            </h2>

            <DetailStats stats={pokemonData.stats} />
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
