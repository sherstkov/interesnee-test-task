import { useFormContext } from 'react-hook-form';

function InputName() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <label htmlFor='name'>New book name:</label>
      <input
        {...register('name', { required: true, maxLength: 100 })}
        type='text'
        name='name'
        placeholder='Type a new book name here'
      />
      {errors.name && errors.name.type === 'required' && (
        <span>This field is required</span>
      )}
      {errors.name && errors.name.type === 'maxLength' && (
        <span>Max length exceeded</span>
      )}
    </div>
  );
}

export default InputName;
