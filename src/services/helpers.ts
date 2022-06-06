//general function to pass regex

const passRegex = (regex: RegExp, stringToCheck: string) =>
  stringToCheck.match(regex) &&
  stringToCheck.match(regex)![0] === stringToCheck;

//special function to check authors
export const passRegexAuthors = (stringToCheck: string) =>
  passRegex(
    /^(?:(?:[a-zA-Z\u0401\u0451\u0410-\u044f]+(?:\.\s[a-zA-Z\u0401\u0451\u0410-\u044f]+|\-|\s[a-zA-Z\u0401\u0451\u0410-\u044f]+)*)(?:(?:,\s)?|$))+/g,
    stringToCheck
  );
//special functions to check isbn
export const passRegexISBN = (stringToCheck: string) =>
  passRegex(
    /^(?=[0-9]{10}$|(?=(?:[0-9]+[-●]){3})[-●0-9]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[-●]){4})[-●0-9]{17}$)(?:97[89][-●]?)?[0-9]{1,5}[-●]?[0-9]+[-●]?[0-9]+[-●]?[0-9]$/g,
    stringToCheck
  );

export const groupBy = <T, K>(
  list: T[],
  getKey: (item: T) => K
): [string, any][] => {
  const groupedList = list.reduce((previous, currentItem) => {
    let group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as any);

  //return sorted array with entries to make sure book inside are ordered
  return Object.entries(groupedList)
    .sort(function (a, b) {
      if (+a[0] < +b[0]) return -1;
      if (+a[0] > +b[0]) return 1;
      return 0;
    })
    .reverse();
};

export const groupByNested = <T, K extends string>(
  list: T[],
  getKey: (item: T) => K
): [string, any][] => {
  const groupedList = list.reduce((previous, currentItem) => {
    const group = getKey(currentItem).split(', ');
    group.forEach((element) => {
      if (!previous[element]) previous[element] = [];
      previous[element].push(currentItem);
    });

    return previous;
  }, {} as any);

  //return sorted array with entries to make sure book inside are ordered
  return Object.entries(groupedList).sort();
};
