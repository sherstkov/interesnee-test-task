export type Book = {
  id: string;
  name: string;
  authors: string;
  publicationYear: number | undefined;
  rating: number | string;
  ISBN: string;
};

export type Books = Book[];

export type BookFormProps = {
  initialValues: Book;
  onClose: function;
};

export type SingleBookType = {
  currentBook: Book;
  filter?: string;
  icons?: React.ReactNode;
};
