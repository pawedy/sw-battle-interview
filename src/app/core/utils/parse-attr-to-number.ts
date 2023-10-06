export const parseAttrToNumber = (attr: string): number => {
  const removedCommas = attr.replaceAll(',', '');
  const numberAttr = Number(removedCommas);

  if (isNaN(numberAttr)) {
    throw new Error('Cannot parse the attribute to number');
  }

  return numberAttr;
};
