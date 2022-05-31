import OrderFilters from './OrderFilters';
import { useGetBooksQuery, useDeleteBookMutation } from '../../slices/apiSlice';
import { useAppSelector } from '../../store/index';
import { Loader } from '../index';
import { Books, Book } from '../../customTypes/Books';
import PublicationYearView from './PublicationYearView';
import RatingView from './RatingView';
import AuthorsView from './AuthorsView';

function BooksList() {
  const { data: books = [], isLoading, isError } = useGetBooksQuery();
  //getting current filter
  const activeFilter = useAppSelector((state) => state.filters.activeFilter);

  if (isLoading) {
    return <Loader />;
  } else if (isError) {
    return <h1>Loading error</h1>;
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
    <>
      <h1>Books List</h1>
      <OrderFilters />
      {elements}
    </>
  );
}

export default BooksList;
