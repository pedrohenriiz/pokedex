import { getPokemonNameShortcut } from '../../functions/getPokemonNameShortcut';

export function DetailStats({ stats }) {
  return (
    <div className='flex flex-col justify-center mt-6 bg-gray-50 rounded-lg sm:w-2/6 w-full   shadow-md mb-6'>
      {stats?.map((stat) => {
        return (
          <div key={stat.stat.name} className='flex items-center p-4'>
            <span className='mr-2 font-bold w-10 uppercase text-gray-700'>
              {getPokemonNameShortcut(stat.stat.name)}
            </span>
            <span className='mr-2 text-gray-500'>{stat.base_stat}</span>

            <div className='ml-2 w-full bg-gray-200 h-2 rounded-lg'>
              <div
                className='bg-red-400 h-2 rounded-lg'
                style={{
                  width: `${stat.base_stat > 100 ? 100 : stat.base_stat}%`,
                }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
