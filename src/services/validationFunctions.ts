import { passRegexAuthors } from './helpers';

export const validateName = (value: string) =>
  //check value.length > 0 just in case html-attribute "required" can be deleted
  value.trim().length <= 100 && value.trim().length > 0
    ? null
    : 'Field is required, but not more than 100 symbols';

export const validateAuthors = (value: string) =>
  passRegexAuthors(value.trim())
    ? null
    : 'More than one author should be separated with comma and space without symbol at the end. Example: Albert Camus, Franz Kafka';

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
