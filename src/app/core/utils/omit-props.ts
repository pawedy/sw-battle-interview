import { EntryProperties, PlayerProps } from '../models';

export const omitProps = (
  obj: EntryProperties,
  omit: string[]
): PlayerProps => {
  return Object.entries(obj).reduce((props, [key, value]) => {
    const urlPattern =
      /^(http(s):\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/;

    const isOmmitedProp = omit.includes(key);
    const isSimpleString = typeof value === 'string' && !urlPattern.test(value);
    const isNumber = typeof value === 'number';

    if (!isOmmitedProp && (isSimpleString || isNumber)) {
      return { ...props, [key]: value };
    }
    return { ...props };
  }, {} as PlayerProps);
};
