export function getPokemonNameShortcut(statName) {
  let shortName = '';

  switch (statName) {
    case 'hp': {
      shortName = 'hp';
      break;
    }

    case 'attack': {
      shortName = 'atk';
      break;
    }

    case 'defense': {
      shortName = 'def';
      break;
    }

    case 'special-attack': {
      shortName = 'Sat';
      break;
    }

    case 'special-defense': {
      shortName = 'Sde';
      break;
    }

    case 'speed': {
      shortName = 'spd';
      break;
    }

    default: {
      shortName = 'atk';
      break;
    }
  }

  return shortName;
}
