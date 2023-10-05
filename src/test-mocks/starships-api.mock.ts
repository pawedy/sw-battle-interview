import { ApiEntry, ApiList, StarshipsProperties } from '../app/core/models';

export const starshipsMockList: ApiList = {
  message: 'ok',
  total_records: 36,
  total_pages: 4,
  previous: null,
  next: 'https://www.swapi.tech/api/starships?page=2&limit=10',
  results: [
    {
      uid: '2',
      name: 'CR90 corvette',
      url: 'https://www.swapi.tech/api/starships/2',
    },
    {
      uid: '3',
      name: 'Star Destroyer',
      url: 'https://www.swapi.tech/api/starships/3',
    },
    {
      uid: '5',
      name: 'Sentinel-class landing craft',
      url: 'https://www.swapi.tech/api/starships/5',
    },
    {
      uid: '9',
      name: 'Death Star',
      url: 'https://www.swapi.tech/api/starships/9',
    },
    {
      uid: '11',
      name: 'Y-wing',
      url: 'https://www.swapi.tech/api/starships/11',
    },
    {
      uid: '10',
      name: 'Millennium Falcon',
      url: 'https://www.swapi.tech/api/starships/10',
    },
    {
      uid: '13',
      name: 'TIE Advanced x1',
      url: 'https://www.swapi.tech/api/starships/13',
    },
    {
      uid: '15',
      name: 'Executor',
      url: 'https://www.swapi.tech/api/starships/15',
    },
    {
      uid: '12',
      name: 'X-wing',
      url: 'https://www.swapi.tech/api/starships/12',
    },
    {
      uid: '17',
      name: 'Rebel transport',
      url: 'https://www.swapi.tech/api/starships/17',
    },
  ],
};

export const starshipsMockItem: ApiEntry<StarshipsProperties> = {
  message: 'ok',
  result: {
    properties: {
      model: 'DS-1 Orbital Battle Station',
      starship_class: 'Deep Space Mobile Battlestation',
      manufacturer:
        'Imperial Department of Military Research, Sienar Fleet Systems',
      cost_in_credits: '1000000000000',
      length: '120000',
      crew: '342,953',
      passengers: '843,342',
      max_atmosphering_speed: 'n/a',
      hyperdrive_rating: '4.0',
      MGLT: '10',
      cargo_capacity: '1000000000000',
      consumables: '3 years',
      pilots: [],
      created: '2020-09-17T17:55:06.604Z',
      edited: '2020-09-17T17:55:06.604Z',
      name: 'Death Star',
      url: 'https://www.swapi.tech/api/starships/9',
    },
    description: 'A Starship',
    uid: '9',
  },
};
