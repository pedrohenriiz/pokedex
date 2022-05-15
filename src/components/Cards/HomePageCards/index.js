import { Link } from 'react-router-dom';

import getPokemonTypeColor from '../../../functions/getPokemonTypeColor';

export function HomePageCard({ pokemon, lastPokemonElementRef = null }) {
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

      <div>
        {types.map((type) => {
          const { type: pokeType } = type;

          const typeColor = getPokemonTypeColor(pokeType.name);

          return (
            <span
              key={pokeType.name}
              className={`${typeColor} mr-2 transform -translate-y-14 inline-block uppercase font-bold text-sm`}
            >
              {pokeType.name}
            </span>
          );
        })}
      </div>

      <span className='text-gray-600 font-bold uppercase no-underline inline-block transform -translate-y-6'>
        <Link to={`/${pokemon.id}`}>Details</Link>
      </span>
    </div>
  );
}
