export const parseAttrToNumber = (attr: string | number): number => {
  if (typeof attr === 'number') {
    checkIfNaNError(attr);
    return attr;
  }
  const regex = /[,-]/g;
  const removedCommas = attr.replaceAll(regex, '');
  //TODO: could use some other logic to handle unknown values
  const isUnknown = removedCommas === 'unknown';
  const numberAttr = Number(isUnknown ? 0 : removedCommas);

  checkIfNaNError(numberAttr);

  return numberAttr;
};

const checkIfNaNError = (nr: number): void => {
  if (isNaN(nr)) {
    throw new Error('Cannot parse the attribute to number');
  }
};
