import { useFormContext } from 'react-hook-form';

function InputPublicationpublicationYear() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <label htmlFor='publicationYear'>
        Fill publication year with a number more or equal to 1800:
      </label>
      <input
        {...register('publicationYear', {
          min: 1800,
          max: new Date().getFullYear(),
          valueAsNumber: true,
        })}
        type='number'
        name='publicationYear'
        placeholder='2012'
        min='1800'
        max={new Date().getFullYear()}
      />
      {errors.publicationYear && (
        <span>Please enter a valid year between 1800 and now</span>
      )}
    </div>
  );
}

export default InputPublicationpublicationYear;
