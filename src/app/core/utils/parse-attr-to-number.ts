export const parseAttrToNumber = (attr: string): number => {
  const regex = /[,-]/g;
  const removedCommas = attr.replaceAll(regex, '');
  const numberAttr = Number(removedCommas);

  if (isNaN(numberAttr)) {
    throw new Error('Cannot parse the attribute to number');
  }

  return numberAttr;
};
