import { PeopleProperties } from './api/people.types';
import { StarshipsProperties } from './api/starships.types';

export type Player = StarshipsProperties | PeopleProperties;
