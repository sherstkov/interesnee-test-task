//general function to pass regex

const passRegex = (regex: RegExp, stringToCheck: string) =>
  (stringToCheck.match(regex) &&
    // @ts-ignore: Object is possibly 'null'.
    stringToCheck.match(regex)[0] === stringToCheck) ||
  'passRegex error';

//special function to check authors
export const passRegexAuthors = (arrayWithStrings: Array<string>) =>
  passRegex(
    /^(?:(?:[a-zA-Z\u0401\u0451\u0410-\u044f]+(?:\.\s[a-zA-Z\u0401\u0451\u0410-\u044f]+|\-|\s[a-zA-Z\u0401\u0451\u0410-\u044f]+)*)(?:(?:,\s)?|$))+/g,
    arrayWithStrings.join(', ')
  );

export const groupBy = <T, K>(
  list: T[],
  getKey: (item: T) => K
): [string, any][] => {
  const groupedList = list.reduce((previous, currentItem) => {
    let group = Number.isNaN(getKey(currentItem)) ? 0 : getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as any);
  //return sorted array with entries to make sure book inside are ordered
  return Object.entries(groupedList).sort();
};

export const groupByNested = <T, K extends Array<string>>(
  list: T[],
  getKey: (item: T) => K
): [string, any][] => {
  const groupedList = list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    group.forEach((element) => {
      if (!previous[element]) previous[element] = [];
      previous[element].push(currentItem);
    });

    return previous;
  }, {} as any);
  //return sorted array with entries to make sure book inside are ordered
  return Object.entries(groupedList).sort();
};
