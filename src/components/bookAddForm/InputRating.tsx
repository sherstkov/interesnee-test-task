import { useFormContext } from 'react-hook-form';

function InputRating() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label htmlFor='rating'>Set optional rating(0 means no rating):</label>
      <select
        {...register('rating', {
          setValueAs: (v: string) => +v,
        })}
        name='rating'
      >
        {Array.from({ length: 11 }, (x, i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
    </div>
  );
}

export default InputRating;
