export type Book = {
  id: string;
  name: string;
  authors: Array<string>;
  publicationDate?: number | null;
  rating?: number;
  ISBN?: string;
};

export type Books = Book[];
