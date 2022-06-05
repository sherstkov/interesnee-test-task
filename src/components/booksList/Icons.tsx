import { useCallback, useState } from 'react';
import { Edit, BookOff } from 'tabler-icons-react';
import { useDeleteBookMutation } from '../../slices/apiSlice';
import { ActionIcon, Popover } from '@mantine/core';
import { BookForm } from '../index';
import styles from '../../styles/BooksList.module.css';

function Icons(props: { currentBook: any }) {
  const { currentBook } = props;

  const [deleteBook] = useDeleteBookMutation();

  const [opened, setOpened] = useState(false);

  const onDelete = useCallback((id: string) => {
    deleteBook(id);
  }, []);

  return (
    <div className={styles.icons}>
      {/* delete book */}
      <ActionIcon onClick={() => onDelete(currentBook.id)}>
        <BookOff />
      </ActionIcon>
      {/* edit book */}
      <Popover
        opened={opened}
        onClose={() => setOpened(false)}
        position='bottom'
        placement='end'
        withCloseButton
        title='Edit book'
        transition='pop-top-right'
        target={
          <ActionIcon onClick={() => setOpened((o) => !o)}>
            <Edit />
          </ActionIcon>
        }
      >
        <BookForm
          initialValues={{
            ...currentBook,
            //stringify rating otherwise initial value can't take new value from db
            rating: currentBook.rating.toString(),
            //zero check to fill empty year input
            publicationYear:
              currentBook.publicationYear === 0
                ? undefined
                : currentBook.publicationYear,
          }}
          onClose={() => setOpened((o) => !o)}
        />
      </Popover>
    </div>
  );
}

export default Icons;
