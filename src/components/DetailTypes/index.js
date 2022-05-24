import React from 'react';

import { v4 as uuidv4 } from 'uuid';

import { PokemonTypes } from '../PokemonTypes';

export function DetailTypes({ name, types }) {
  return (
    <div className='mt-36 font-bold uppercase text-center '>
      <span className='text-2xl text-gray-700'>{name}</span>
      <div>
        {types?.map((type) => {
          return <PokemonTypes key={uuidv4()} pokeType={type} />;
        })}
      </div>
    </div>
  );
}
