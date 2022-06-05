import { passRegexAuthors } from './helpers';

export const validateName = (value: string) =>
  //check value.length > 0 just in case html-attribute "required" can be deleted
  value.trim().length <= 100 && value.trim().length > 0
    ? null
    : 'Field is required, but not more than 100 symbols';

export const validateAuthors = (value: string) =>
  passRegexAuthors(value.trim())
    ? null
    : 'Invalid authors. Example: Albert Camus, Franz Kafka';

export const validetePublicationYear = (value: undefined | number) => {
  //pass empty/deleted input
  if (value === undefined) {
    return null;
  }
  //check value 'cuz html-attributes "min/max" can be deleted
  return +value! >= 1800 && +value! <= new Date().getFullYear()
    ? null
    : 'Please enter a valid year between 1800 and now';
};

export const validateISBN10 = (value: string) => {
  const trimmedValue = value.trim().split('').reverse();
  if (trimmedValue.length !== 10) return 'ISBN is invalid';
  const accumulatedISBN = trimmedValue.reduce(
    (accumulator, value, index) => accumulator + +value * (index + 1),
    0
  );
  return accumulatedISBN % 11 === 0 ? null : 'ISBN is invalid';
};

export const validateISBN13 = (value: string) => {
  const trimmedValue = value.trim().split('');
  if (trimmedValue.length !== 13) return 'ISBN is invalid';
  const accumulatedISBN = trimmedValue.reduce(
    (accumulator, value, index) =>
      accumulator + +value * (index % 2 === 0 ? 1 : 3),
    0
  );
  console.log(accumulatedISBN);
  return accumulatedISBN % 10 === 0 ? null : 'ISBN is invalid';
};
