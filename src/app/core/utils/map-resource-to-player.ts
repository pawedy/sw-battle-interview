import { PROPS_TO_OMIT } from '../constants/props-to-omit.constant';
import { Player, Resource } from '../models';
import { omitProps } from './omit-props';

export const mapResourceToPlayer = (resource: Resource): Player => {
  const playerProps = omitProps(resource, PROPS_TO_OMIT);
  return {
    name: resource.name,
    props: playerProps,
  };
};
