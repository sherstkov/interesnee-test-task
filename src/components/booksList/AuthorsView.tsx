import { Books, Book } from 'customTypes/Books';
import { groupByNested } from '../../services/helpers';
import { Card, Text, Title } from '@mantine/core';
import styles from '../../styles/BooksList.module.css';

function AuthorsView(books: Books) {
  const orderedBooksList = groupByNested(books, ({ authors }) => authors);

  const elements = orderedBooksList.map((item) => (
    <div key={item[0]}>
      <h2>{item[0]}</h2>
      <div className={styles.group}></div>
      {item[1].map(
        ({ id, name, authors, ISBN, publicationYear, rating }: Book) => (
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
            {rating ? <Text>Rating: {rating}</Text> : null}
            {ISBN ? <Text>ISBN: {ISBN}</Text> : null}
          </Card>
        )
      )}
    </div>
  ));

  return <>{elements}</>;
}

export default AuthorsView;
