import { Edit, BookOff } from 'tabler-icons-react';
import styles from '../../styles/BooksList.module.css';

type IProps = {
  id: string;
};

function Icons({ id }: IProps) {
  return (
    <div className={styles.icons}>
      <BookOff />
      <Edit />
    </div>
  );
}

export default Icons;
