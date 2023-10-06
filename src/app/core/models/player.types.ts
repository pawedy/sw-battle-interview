import { PeopleDisplayProperties, StarshipsDisplayedProperties } from './api';

export type PlayerProps =
  | PeopleDisplayProperties
  | StarshipsDisplayedProperties;

export interface Player {
  name: string;
  props: PlayerProps;
}
