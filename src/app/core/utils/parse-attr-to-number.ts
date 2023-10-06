export const parseAttrToNumber = (attr: string): number => {
  const regex = /[,-]/g;
  const removedCommas = attr.replaceAll(regex, '');
  //TODO: could use some other logic to handle unknown values
  const isUnknown = removedCommas === 'unknown';
  const numberAttr = Number(isUnknown ? 0 : removedCommas);

  if (isNaN(numberAttr)) {
    throw new Error('Cannot parse the attribute to number');
  }

  return numberAttr;
};
