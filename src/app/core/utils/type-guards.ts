import {
  PeopleDisplayProperties,
  Player,
  StarshipsDisplayedProperties,
} from '../models';

export const isPeople = (
  props: Player['props'] | null | undefined
): props is PeopleDisplayProperties => {
  return (props as PeopleDisplayProperties)?.hair_color !== undefined;
};

export const isStarship = (
  props: Player['props'] | null | undefined
): props is StarshipsDisplayedProperties => {
  return (props as StarshipsDisplayedProperties)?.crew !== undefined;
};
