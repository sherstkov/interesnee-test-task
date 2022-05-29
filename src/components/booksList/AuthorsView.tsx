import { Books, Book } from 'customTypes/Books';
import { groupByNested } from '../../services/helpers';

function AuthorsView(books: Books) {
  const orderedBooksList = groupByNested(books, ({ authors }) => authors);

  const elements = orderedBooksList.map((item) => (
    <div key={item[0]} style={{ backgroundColor: 'gray' }}>
      <h2>{item[0]}</h2>
      {item[1].map(
        ({ id, name, authors, ISBN, publicationYear, rating }: Book) => (
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
            {rating ? <h3>Rating: {rating}</h3> : null}
            {ISBN ? <h3>ISBN: {ISBN}</h3> : null}
          </div>
        )
      )}
    </div>
  ));

  return <>{elements}</>;
}

export default AuthorsView;
