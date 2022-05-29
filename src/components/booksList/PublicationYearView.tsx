import { Books, Book } from 'customTypes/Books';
import { groupBy } from '../../services/helpers';

function PublicationYearView(books: Books) {
  const orderedBooksList = groupBy(
    books,
    ({ publicationYear }) => publicationYear
  ).reverse();
  // console.log(orderedBooksList);

  const elements = orderedBooksList.map((item) => (
    <div key={item[0]} style={{ backgroundColor: 'gray' }}>
      <h2>{+item[0] || 'Not specified'}</h2>
      {item[1].map(({ id, name, rating, authors, ISBN }: Book) => (
        <div key={id}>
          <h3>{name}</h3>
          {authors.length > 1 ? (
            <h3>Authors: {authors.join(', ')}</h3>
          ) : (
            <h3>Author: {authors[0]}</h3>
          )}
          {rating ? <h3>Rating: {rating}</h3> : null}
          {ISBN ? <h3>ISBN: {ISBN}</h3> : null}
        </div>
      ))}
    </div>
  ));

  return <>{elements}</>;
}

export default PublicationYearView;
