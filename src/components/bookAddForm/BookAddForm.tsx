import { v4 as uuidv4 } from 'uuid';
import { Button } from '@mantine/core';
import { useCreateBookMutation } from '../../slices/apiSlice';
import { Card, TextInput, NumberInput, Select, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  validateName,
  validateAuthors,
  validetePublicationYear,
  validateISBN,
} from '../../services/validationFunctions';

function BookAddForm() {
  const [bookMutation] = useCreateBookMutation();
  const form = useForm({
    initialValues: {
      name: '',
      authors: '',
      rating: '0',
      publicationYear: undefined,
      ISBN: '',
    },
    validate: {
      name: (value: string) => validateName(value),
      authors: (value: string) => validateAuthors(value),
      publicationYear: (value: undefined | number) =>
        validetePublicationYear(value),
      ISBN: (value: string) => validateISBN(value),
    },
  });

  //handle submit
  const handleSubmit = (values: typeof form.values) => {
    bookMutation({
      id: uuidv4(),
      name: values.name.trim(),
      authors: values.authors.trim(),
      publicationYear: values.publicationYear ? +values.publicationYear : 0,
      rating: +values.rating,
      ISBN: values.ISBN.trim(),
    });
    //reset main form when creating new book, close popover when editing
    form.reset();
  };

  //getting select options
  const selectOptions = Array(10)
    .fill(0)
    .map((_, index) => `${index + 1}`);

  return (
    <>
      <Title mb='xs'>Add a new book</Title>
      <Card p='lg' mb='lg'>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            required
            label='Set new book name'
            placeholder='Type a new book name here'
            {...form.getInputProps('name')}
          />

          <TextInput
            required
            label='Set author or authors'
            placeholder='Jean-Paul Sartre, Jean Baudrillard, M. Foucault'
            {...form.getInputProps('authors')}
          />
          <NumberInput
            label='Set publication year with a number more or equal than 1800'
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
            placeholder='978-5-9614-2021-0'
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

export default BookAddForm;
