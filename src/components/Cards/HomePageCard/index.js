import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { PokemonTypes } from '../../PokemonTypes';

export function HomePageCard({
  pokemon,
  lastPokemonElementRef = null,
  pageNumber,
}) {
  const { name, sprites, types } = pokemon;

  return (
    <div
      ref={lastPokemonElementRef}
      key={name}
      className={`flex flex-col items-center justify-center mt-16 bg-white shadow rounded w-11/12 sm:min-w-0 sm:w-4/5 `}
    >
      <img
        className='transform -translate-y-14  w-40'
        src={sprites.other['official-artwork'].front_default}
        alt={name}
      />
      <h2 className='text-2xl text-center transform -translate-y-14 uppercase font-bold text-gray-700'>
        {name}
      </h2>

      <div className='transform -translate-y-14'>
        {types.map((type) => {
          return <PokemonTypes key={uuidv4()} pokeType={type} />;
        })}
      </div>

      <span className='text-gray-600 font-bold uppercase no-underline inline-block transform -translate-y-6'>
        <Link
          to={`/${pokemon.id}`}
          onClick={() => {
            const pageHeight = window.scrollY;

            localStorage.setItem('pageHeight', pageHeight);
            localStorage.setItem('pageNumber', pageNumber);
          }}
        >
          Details
        </Link>
      </span>
    </div>
  );
}
