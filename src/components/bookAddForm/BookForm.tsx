import { v4 as uuidv4 } from 'uuid';
import { Button } from '@mantine/core';
import {
  useCreateBookMutation,
  useEditBookMutation,
} from '../../slices/apiSlice';
import { Card, TextInput, NumberInput, Select, Title } from '@mantine/core';
import { useForm } from '@mantine/form';

import styles from '../../styles/BookAddForm.module.css';
import {
  validateName,
  validateAuthors,
  validetePublicationYear,
} from '../../services/validationFunctions';
import { BookFormProps, Book } from '../../customTypes/Books';

const defaultInitialValues: Book = {
  id: uuidv4(),
  name: '',
  authors: '',
  rating: '0',
  publicationYear: undefined,
  ISBN: '',
};

function BookForm({
  initialValues = defaultInitialValues,
  isEdit = false,
  onClose,
}: BookFormProps) {
  const [bookMutation] = isEdit
    ? useEditBookMutation()
    : useCreateBookMutation();
  const form = useForm({
    initialValues,
    validate: {
      name: (value: string) => validateName(value),
      authors: (value: string) => validateAuthors(value),
      publicationYear: (value: undefined | number) =>
        validetePublicationYear(value),
    },
  });

  //handle submit
  const handleSubmit = (values: typeof form.values) => {
    bookMutation({
      id: initialValues.id,
      name: values.name.trim(),
      authors: values.authors.trim(),
      publicationYear: values.publicationYear ? +values.publicationYear : 0,
      rating: +values.rating,
      ISBN: values.ISBN.trim(),
    });
    //reset main form when creating new book, close popover when editing
    isEdit ? onClose() : form.reset();
  };

  //getting select options
  const selectOptions = Array(10)
    .fill(0)
    .map((_, index) => `${index + 1}`);

  return (
    <>
      {!isEdit && <Title mb='xs'>Add a new book</Title>}
      <Card p='lg' mb='lg'>
        <form
          className={styles.container}
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <TextInput
            required
            label='New book name'
            placeholder='Type a new book name here'
            {...form.getInputProps('name')}
          />

          <TextInput
            required
            label='Type author or authors'
            placeholder='Jean-Paul Sartre, Jean Baudrillard, M. Foucault'
            {...form.getInputProps('authors')}
          />
          <NumberInput
            label='Fill publication year with a number more or equal than 1800'
            name='publicationYear'
            placeholder='2012'
            min={1800}
            max={new Date().getFullYear()}
            {...form.getInputProps('publicationYear')}
          />
          <Select
            label='Set rating'
            clearable
            placeholder='0'
            data={selectOptions}
            {...form.getInputProps('rating')}
          />
          <TextInput
            label='Set ISBN'
            placeholder='978-5-459-01044-2'
            {...form.getInputProps('ISBN')}
          />

          <Button mt='lg' type='submit'>
            Sumbit
          </Button>
        </form>
      </Card>
    </>
  );
}

export default BookForm;
