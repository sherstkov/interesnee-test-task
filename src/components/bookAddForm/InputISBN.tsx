import { useFormContext } from 'react-hook-form';

function InputISBN() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <label htmlFor='ISBN'>New book name:</label>
      <input
        {...register('ISBN')}
        type='text'
        name='ISBN'
        placeholder='Set ISBN(optional)'
      />
    </div>
  );
}

export default InputISBN;
