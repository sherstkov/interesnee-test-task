import { useFormContext } from 'react-hook-form';
import { passRegexAuthors } from '../../services/helpers';

function InputAuthors() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <label htmlFor='name'>Type author or authors:</label>
      <input
        {...register('authors', {
          required: true,
          validate: {
            passRegex: (v: string) => passRegexAuthors(v),
          },
        })}
        type='text'
        name='authors'
        placeholder='Jean-Paul Sartre, Jean Baudrillard, M. Foucault'
      />
      {errors.authors && errors.authors.type === 'required' && (
        <span>This field requires at least one author</span>
      )}
      {errors.authors && errors.authors.type === 'passRegex' && (
        <span>
          More than one author should be separated with comma and space without
          symbol at the end. Example:<i>Albert Camus, Franz Kafka</i>
        </span>
      )}
    </div>
  );
}

export default InputAuthors;
