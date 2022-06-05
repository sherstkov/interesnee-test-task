import { Books, Book } from 'customTypes/Books';
import { groupBy, groupByNested } from '../../services/helpers';
import { SingleBook } from '../index';
import Icons from './Icons';
import styles from '../../styles/BooksList.module.css';

function GroupedBooksView(books: Books, activeFilter: string) {
  let orderedBooksList;
  switch (activeFilter) {
    case 'byYear':
      orderedBooksList = groupBy(
        books,
        ({ publicationYear }) => publicationYear
      );
      break;
    case 'byRating':
      orderedBooksList = groupBy(books, ({ rating }) => rating);
      break;
    case 'byAuthor':
      orderedBooksList = groupByNested(books, ({ authors }) => authors);
      break;
    default:
      'Cant happen';
      break;
  }

  const elements = orderedBooksList?.map((item) => (
    <div key={item[0]}>
      <h2>
        {activeFilter === 'byAuthor' ? item[0] : +item[0] || 'Not specified'}
      </h2>
      <div className={styles.group}>
        {item[1].map((currentBook: Book) => (
          <SingleBook
            key={currentBook.id}
            currentBook={currentBook}
            filter={activeFilter}
            icons={<Icons currentBook={currentBook} />}
          />
        ))}
      </div>
    </div>
  ));

  return <>{elements}</>;
}

export default GroupedBooksView;
