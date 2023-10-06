import { GeneralEntryProperties } from './api.types';

export interface PeopleDisplayProperties {
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
}

export interface PeopleProperties
  extends PeopleDisplayProperties,
    GeneralEntryProperties {}
