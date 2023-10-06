import { PlayerProps, Resource } from '../models';

export const omitProps = (obj: Resource, omit: string[]): PlayerProps => {
  return Object.entries(obj).reduce((props, [key, value]) => {
    const isOmmitedProp = omit.includes(key);
    const isSimpleType = ['string', 'number'].includes(typeof value);
    if (isSimpleType && !isOmmitedProp) {
      return { ...props, [key]: value };
    }
    return { ...props };
  }, {} as PlayerProps);
};
