import { Books, Book } from 'customTypes/Books';
import { groupBy } from '../../services/helpers';

function RatingView(books: Books) {
  const orderedBooksList = groupBy(books, ({ rating }) => rating).reverse();
  // console.log(orderedBooksList);

  const elements = orderedBooksList.map((item) => (
    <div key={item[0]} style={{ backgroundColor: 'gray' }}>
      <h2>{+item[0] || 'Not specified'}</h2>
      {item[1].map(({ id, name, authors, ISBN, publicationYear }: Book) => (
        <div key={id}>
          <h3>{name}</h3>
          {authors.length > 1 ? (
            <h4>Authors: {authors.join(', ')}</h4>
          ) : (
            <h4>Author: {authors[0]}</h4>
          )}
          {publicationYear ? (
            <h4>Publication Year: {publicationYear}</h4>
          ) : null}
          {ISBN ? <h3>ISBN: {ISBN}</h3> : null}
        </div>
      ))}
    </div>
  ));

  return <>{elements}</>;
}

export default RatingView;
