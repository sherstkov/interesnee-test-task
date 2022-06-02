export type Book = {
  id: string;
  name: string;
  authors: Array<string>;
  publicationYear: number;
  rating: number;
  ISBN: string;
};

export type Books = Book[];
