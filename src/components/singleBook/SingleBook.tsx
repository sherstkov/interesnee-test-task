import { Card, Text, Title } from '@mantine/core';
import { SingleBookType } from '../../customTypes/Books';

function SingleBook({ currentBook, filter, icons }: SingleBookType) {
  const { id, name, authors, publicationYear, rating, ISBN } = currentBook;
  return (
    <Card
      sx={(theme) => ({
        backgroundColor: theme.colors.dark[5],
        display: 'flex',
        flexDirection: 'row',
      })}
      mb='md'
    >
      <div>
        <Title order={4}>{name}</Title>
        <Text>
          {authors.split(', ').length > 1 ? `Authors: ` : `Author: `} {authors}
        </Text>
        {publicationYear && filter !== 'byYear' ? (
          <Text>Publication Year: {publicationYear}</Text>
        ) : null}
        {rating && filter !== 'byRating' ? <Text>Rating: {rating}</Text> : null}
        {ISBN ? <Text>ISBN: {ISBN}</Text> : null}
      </div>
      {icons}
    </Card>
  );
}

export default SingleBook;
