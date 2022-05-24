import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className='text-center flex-1 mt-12'>
      <Link to='/'>
        <h1 className='text-4xl text-body font-bold'>
          <span className='text-red-400'>Poke</span>dex
        </h1>
      </Link>
    </header>
  );
}
