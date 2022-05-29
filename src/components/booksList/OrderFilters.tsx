import { useAppDispatch } from '../../store/index';
import { filtersChanged } from '../../slices/filterSlice';

function OrderFilters() {
  //handle filters change
  const dispatch = useAppDispatch();

  return (
    <select
      name='order'
      onChange={(e) => dispatch(filtersChanged(e.target.value))}
    >
      <option key='byYear' value='byYear'>
        Order by Publication Year
      </option>
      <option key='byRating' value='byRating'>
        Order by Rating
      </option>
      <option key='byAuthor' value='byAuthor'>
        Order by Author
      </option>
    </select>
  );
}

export default OrderFilters;
