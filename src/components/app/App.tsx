import { BooksList, BookForm, RecommendedBook } from '../index';
import styles from '../../styles/App.module.css';

function App() {
  return (
    <div className={styles.main}>
      <BooksList />
      <div>
        <RecommendedBook />
        <BookForm />
      </div>
    </div>
  );
}

export default App;
