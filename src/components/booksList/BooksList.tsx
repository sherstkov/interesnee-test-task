import { useGetBooksQuery, useDeleteBookMutation } from '../../slices/apiSlice';
import { Loader } from '../index';
import { Books, Book } from '../../customTypes/Books';

function BooksList() {
  const { data: books = [], isLoading, isError } = useGetBooksQuery();

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    <h2>Loading error</h2>;
  }

  //function that renders books list
  const renderBooksList = (booksList: Books) => {
    if (booksList.length === 0) {
      return <h2>Books has not yet been added</h2>;
    }
    return booksList.map((book: Book) => (
      <div key={book.id} style={{ backgroundColor: 'gray' }}>
        <h3>{book.name}</h3>
        <h3>{book.authors[0]}</h3>
      </div>
    ));
  };
  const elements = renderBooksList(books as Books);

  return (
    <>
      <h1>Books List</h1>
      {elements}
    </>
  );
}

export default BooksList;
