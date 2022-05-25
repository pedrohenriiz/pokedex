export function PokemonDetailImage({ name, sprite }) {
  return (
    <div className='mt-36 place-items-center grid grid-cols-1 gap-4'>
      <div className='relative'>
        <h1 className='opacity-10 font-bold uppercase inline-block tracking-[.5em] md:text-7xl text-4xl -z-10 text-center'>
          {name}
        </h1>

        <div className='absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4'>
          <img className='w-80 ' src={sprite} alt={name} />
        </div>
      </div>
    </div>
  );
}
