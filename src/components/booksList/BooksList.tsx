import OrderFilters from './OrderFilters';
import { useGetBooksQuery, useDeleteBookMutation } from '../../slices/apiSlice';
import { useAppSelector } from '../../store/index';
import { Books } from '../../customTypes/Books';
import PublicationYearView from './PublicationYearView';
import RatingView from './RatingView';
import AuthorsView from './AuthorsView';
import { Card, Text, Title, Loader } from '@mantine/core';

function BooksList() {
  const { data: books = [], isLoading, isError } = useGetBooksQuery();
  //getting current filter
  const activeFilter = useAppSelector((state) => state.filters.activeFilter);

  if (isLoading) {
    return <Loader size='xl' variant='dots' />;
  } else if (isError) {
    return <Title>Loading error</Title>;
  }
  //function that renders books list depends on filter
  const renderBooksList = (booksList: Books) => {
    if (booksList.length === 0) {
      return <h2>Books has not yet been added</h2>;
    }
    switch (activeFilter) {
      case 'byRating':
        return RatingView(booksList);
      case 'byAuthor':
        return AuthorsView(booksList);
      default:
        return PublicationYearView(booksList);
    }
  };
  const elements = renderBooksList(books as Books);

  return (
    <div>
      <Title mb='xs'>Books list</Title>
      <OrderFilters />
      {elements}
    </div>
  );
}

export default BooksList;
