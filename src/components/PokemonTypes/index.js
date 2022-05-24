import getPokemonTypeColor from '../../functions/getPokemonTypeColor';

export function PokemonTypes({ pokeType }) {
  const { type } = pokeType;

  const typeColor = getPokemonTypeColor(type.name);

  return (
    <span
      key={type.name}
      className={`${typeColor} mr-2 inline-block uppercase font-bold`}
    >
      {type.name}
    </span>
  );
}
