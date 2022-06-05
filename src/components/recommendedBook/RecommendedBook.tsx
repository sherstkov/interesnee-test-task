import { useGetRecommendedBooksQuery } from '../../slices/apiSlice';
import { groupBy } from '../../services/helpers';
import { Books, Book } from 'customTypes/Books';
import { Loader, Title } from '@mantine/core';
import { SingleBook } from '../index';

function RecommendedBook() {
  const {
    data: books = [],
    isLoading,
    isError,
  } = useGetRecommendedBooksQuery(new Date().getFullYear() - 3);

  const getGoodRecommendedBook = (booksList: Books) => {
    if (booksList.length === 0) return <h2>No good book</h2>;

    //group books by rating and grab array with highest one
    const highestRatingBooks = groupBy(booksList, ({ rating }) => rating)[0][1];

    //get random book
    const bookToRender: Book =
      highestRatingBooks[Math.floor(Math.random() * highestRatingBooks.length)];
    //return rendered book
    const { id, name, rating, authors, ISBN, publicationYear } = bookToRender;
    return <SingleBook currentBook={bookToRender} />;
  };

  if (isLoading) {
    return <Loader color='dark' size='xl' variant='dots' />;
  } else if (isError) {
    return <h1>Loading error</h1>;
  }
  const elements = getGoodRecommendedBook(books as Books);
  return (
    <>
      <Title mb='xs'>Recommended book</Title>
      {elements}
    </>
  );
}

export default RecommendedBook;
