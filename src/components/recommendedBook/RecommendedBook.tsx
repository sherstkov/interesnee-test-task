import { useGetRecommendedBooksQuery } from '../../slices/apiSlice';
import { Loader } from '../index';
import { groupBy } from '../../services/helpers';
import { Books, Book } from 'customTypes/Books';

function RecommendedBook() {
  const {
    data: books = [],
    isLoading,
    isError,
  } = useGetRecommendedBooksQuery(new Date().getFullYear() - 3);

  const getGoodRecommendedBook = (booksList: Books) => {
    if (booksList.length === 0) return <h2>No good book</h2>;

    //group books by rating and grab array with highest one
    const highestRatingBooks = groupBy(
      booksList,
      ({ rating }) => rating
    ).reverse()[0][1];
    //get random book
    const bookToRender: Book =
      highestRatingBooks[Math.floor(Math.random() * highestRatingBooks.length)];
    //return rendered book
    const { id, name, rating, authors, ISBN, publicationYear } = bookToRender;
    return (
      <div key={id}>
        <h3>{name}</h3>
        {authors.length > 1 ? (
          <h3>Authors: {authors.join(', ')}</h3>
        ) : (
          <h3>Author: {authors[0]}</h3>
        )}
        <h3>Publication Year: {publicationYear}</h3>
        {rating ? <h3>Rating: {rating}</h3> : null}
        {ISBN ? <h3>ISBN: {ISBN}</h3> : null}
      </div>
    );
  };

  if (isLoading) {
    return <Loader />;
  } else if (isError) {
    return <h1>Loading error</h1>;
  }
  const elements = getGoodRecommendedBook(books as Books);
  return (
    <>
      <h1>Recommended Book:</h1>
      {elements}
    </>
  );
}

export default RecommendedBook;
