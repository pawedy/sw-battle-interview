import { PlayerProps, Resource } from '../models';

export const omitProps = (obj: Resource, omit: string[]): PlayerProps => {
  return Object.entries(obj).reduce((props, [key, value]) => {
    const urlPattern =
      /^(http(s):\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/;

    const isOmmitedProp = omit.includes(key);
    const isSimpleType = ['string', 'number'].includes(typeof value);
    const isUrl = urlPattern.test(value);

    if (isSimpleType && !isOmmitedProp && !isUrl) {
      return { ...props, [key]: value };
    }
    return { ...props };
  }, {} as PlayerProps);
};
