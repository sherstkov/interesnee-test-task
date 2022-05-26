//general function to pass regex

const passRegex = (regex: RegExp, stringToCheck: string) =>
  (stringToCheck.match(regex) &&
    // @ts-ignore: Object is possibly 'null'.
    stringToCheck.match(regex)[0] == stringToCheck) ||
  'passRegex error';

//special function to check authors
export const passRegexAuthors = (arrayWithStrings: Array<string>) =>
  passRegex(
    /^(?:(?:[a-zA-Z\u0401\u0451\u0410-\u044f]+(?:\.\s[a-zA-Z\u0401\u0451\u0410-\u044f]+|\-|\s[a-zA-Z\u0401\u0451\u0410-\u044f]+)*)(?:(?:,\s)?|$))+/g,
    arrayWithStrings.join(', ')
  );
