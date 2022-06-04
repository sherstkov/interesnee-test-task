import { useGetRecommendedBooksQuery } from '../../slices/apiSlice';
import { groupBy } from '../../services/helpers';
import { Books, Book } from 'customTypes/Books';
import { Loader } from '@mantine/core';
import { Card, Text, Title } from '@mantine/core';

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
      <Card key={id} mb='lg'>
        <Title order={4}>{name}</Title>
        {authors.length > 1 ? (
          <Text>Authors: {authors.join(', ')}</Text>
        ) : (
          <Text>Author: {authors[0]}</Text>
        )}
        <Text>Publication Year: {publicationYear}</Text>
        {rating ? <Text>Rating: {rating}</Text> : null}
        {ISBN ? <Text>ISBN: {ISBN}</Text> : null}
      </Card>
    );
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
