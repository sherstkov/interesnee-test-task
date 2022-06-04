import { useAppDispatch } from '../../store/index';
import { filtersChanged } from '../../slices/filterSlice';
import { Select } from '@mantine/core';

function OrderFilters() {
  //handle filters change
  const dispatch = useAppDispatch();

  return (
    <Select
      defaultValue='byYear'
      data={[
        { value: 'byYear', label: 'By Publication Year' },
        { value: 'byRating', label: 'By Rating' },
        { value: 'byAuthor', label: 'By Author' },
      ]}
      onChange={(value) => dispatch(filtersChanged(value))}
    ></Select>
  );
}

export default OrderFilters;
