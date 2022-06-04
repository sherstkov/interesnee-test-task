import { Books, Book } from 'customTypes/Books';
import { groupBy } from '../../services/helpers';
import { Card, Text, Title } from '@mantine/core';
import Icons from './Icons';
import styles from '../../styles/BooksList.module.css';

function PublicationYearView(books: Books) {
  const orderedBooksList = groupBy(
    books,
    ({ publicationYear }) => publicationYear
  ).reverse();

  const elements = orderedBooksList.map((item) => (
    <div key={item[0]}>
      <h2>{+item[0] || 'Not specified'}</h2>
      <div className={styles.group}>
        {item[1].map(({ id, name, rating, authors, ISBN }: Book) => (
          <Card
            key={id}
            sx={(theme) => ({
              backgroundColor: theme.colors.dark[5],
              display: 'flex',
              flexDirection: 'row',
            })}
            mb='md'
          >
            <div>
              <Title order={4}>{name}</Title>
              {authors.length > 1 ? (
                <Text>Authors: {authors.join(', ')}</Text>
              ) : (
                <Text>Author: {authors[0]}</Text>
              )}
              {rating ? <Text>Rating: {rating}</Text> : null}
              {ISBN ? <Text>ISBN: {ISBN}</Text> : null}
            </div>
            <Icons id={id} />
          </Card>
        ))}
      </div>
    </div>
  ));

  return <>{elements}</>;
}

export default PublicationYearView;
