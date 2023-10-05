import { ApiEntry, ApiList, PeopleProperties } from '../app/core/models';

export const peopleMockList: ApiList = {
  message: 'ok',
  total_records: 2,
  total_pages: 1,
  previous: null,
  next: null,
  results: [
    {
      uid: '1',
      name: 'Luke Skywalker',
      url: 'https://www.swapi.tech/api/people/1',
    },
    {
      uid: '2',
      name: 'C-3PO',
      url: 'https://www.swapi.tech/api/people/2',
    },
  ],
};

export const peopleMockItems: ApiEntry<PeopleProperties>[] = [
  {
    message: 'ok',
    result: {
      properties: {
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male',
        created: '2023-10-05T06:04:58.711Z',
        edited: '2023-10-05T06:04:58.711Z',
        name: 'Luke Skywalker',
        homeworld: 'https://www.swapi.tech/api/planets/1',
        url: 'https://www.swapi.tech/api/people/1',
      },
      description: 'A person within the Star Wars universe',
      uid: '1',
    },
  },
  {
    message: 'ok',
    result: {
      properties: {
        height: '167',
        mass: '75',
        hair_color: 'n/a',
        skin_color: 'gold',
        eye_color: 'yellow',
        birth_year: '112BBY',
        gender: 'n/a',
        created: '2023-10-05T06:04:58.711Z',
        edited: '2023-10-05T06:04:58.711Z',
        name: 'C-3PO',
        homeworld: 'https://www.swapi.tech/api/planets/1',
        url: 'https://www.swapi.tech/api/people/2',
      },
      description: 'A person within the Star Wars universe',
      uid: '2',
    },
  },
];
