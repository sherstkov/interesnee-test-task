import { Button } from '@mantine/core';
import { useCreateBookMutation } from '../../slices/apiSlice';
import { TextInput, NumberInput, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  validateName,
  validateAuthors,
  validetePublicationYear,
  validateISBN,
} from '../../services/validationFunctions';
import { BookFormProps } from '../../customTypes/Books';

function BookForm({ initialValues, onClose }: BookFormProps) {
  const [bookMutation] = useCreateBookMutation();
  const form = useForm({
    initialValues,
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
      id: initialValues.id,
      name: values.name.trim(),
      authors: values.authors.trim(),
      publicationYear: values.publicationYear ? +values.publicationYear : 0,
      rating: +values.rating,
      ISBN: values.ISBN.trim(),
    });
    //reset main form when creating new book, close popover when editing
    onClose();
  };

  //getting select options
  const selectOptions = Array(10)
    .fill(0)
    .map((_, index) => `${index + 1}`);

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          required
          label='Edit book name'
          placeholder='Type a new book name here'
          {...form.getInputProps('name')}
        />

        <TextInput
          required
          label='Edit authors'
          placeholder='Jean-Paul Sartre, Jean Baudrillard, M. Foucault'
          {...form.getInputProps('authors')}
        />
        <NumberInput
          label='Edit publication year'
          name='publicationYear'
          placeholder='2012'
          min={1800}
          max={new Date().getFullYear()}
          {...form.getInputProps('publicationYear')}
        />
        <Select
          label='Edit rating'
          clearable
          placeholder='0'
          data={selectOptions}
          {...form.getInputProps('rating')}
        />
        <TextInput
          label='Edit ISBN'
          placeholder='978-5-9614-2021-0'
          {...form.getInputProps('ISBN')}
        />

        <Button mt='lg' type='submit'>
          Sumbit
        </Button>
      </form>
    </>
  );
}

export default BookForm;
