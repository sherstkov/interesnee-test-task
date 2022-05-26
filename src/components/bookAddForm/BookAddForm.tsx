import { v4 as uuidv4 } from 'uuid';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useCreateBookMutation } from './../../slices/apiSlice';
import { Book } from 'customTypes/Books';
import InputName from './InputName';
import InputAuthors from './InputAuthors';
import InputPublicationYear from './InputPublicationYear';
import InputRating from './InputRating';
import InputISBN from './InputISBN';

function BookAddForm() {
  const [createBook] = useCreateBookMutation();

  const methods = useForm<Book>();
  const {
    reset,
    formState: { isSubmitSuccessful },
    handleSubmit,
  } = methods;

  //reset react-hook-form registers
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        name: '',
        authors: [],
        publicationYear: '',
        rating: 0,
        ISBN: '',
      });
    }
  }, [isSubmitSuccessful, reset]);

  //handle submit
  const onSubmit: SubmitHandler<Book> = (data) =>
    createBook({ ...data, id: uuidv4() });

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputName />
        <InputAuthors />
        <InputPublicationYear />
        <InputRating />
        <InputISBN />
        <button type='submit'>Sumbit</button>
      </form>
    </FormProvider>
  );
}

export default BookAddForm;
