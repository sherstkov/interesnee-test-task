import { useFormContext } from 'react-hook-form';

function InputISBN() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <label htmlFor='ISBN'>Set ISBN(optional):</label>
      <input
        {...register('ISBN')}
        type='text'
        name='ISBN'
        placeholder='978-5-459-01044-2'
      />
    </div>
  );
}

export default InputISBN;
