import { Books, Book } from 'customTypes/Books';
import { groupBy } from '../../services/helpers';
import { Card, Text, Title } from '@mantine/core';
import styles from '../../styles/BooksList.module.css';

function RatingView(books: Books) {
  const orderedBooksList = groupBy(books, ({ rating }) => rating).reverse();

  const elements = orderedBooksList.map((item) => (
    <div key={item[0]}>
      <h2>{+item[0] || 'Not specified'}</h2>
      <div className={styles.group}>
        {item[1].map(({ id, name, authors, ISBN, publicationYear }: Book) => (
          <Card
            key={id}
            sx={(theme) => ({ backgroundColor: theme.colors.dark[5] })}
            mb='md'
          >
            <Title order={4}>{name}</Title>
            {authors.length > 1 ? (
              <Text>Authors: {authors.join(', ')}</Text>
            ) : (
              <Text>Author: {authors[0]}</Text>
            )}
            {publicationYear ? (
              <Text>Publication Year: {publicationYear}</Text>
            ) : null}
            {ISBN ? <Text>ISBN: {ISBN}</Text> : null}
          </Card>
        ))}
      </div>
    </div>
  ));

  return <>{elements}</>;
}

export default RatingView;
