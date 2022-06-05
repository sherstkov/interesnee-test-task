import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { firestore } from '../services/firebase';
import {
  query,
  collectionGroup,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
  orderBy,
  where,
  updateDoc,
} from '@firebase/firestore';
import { Book, Books } from '../customTypes/Books';

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Books'],
  endpoints: (builder) => ({
    getBooks: builder.query<Books | object, void>({
      queryFn: async () => {
        try {
          const ref = collectionGroup(firestore, 'books');
          const postsQuery = query(ref, orderBy('name'));
          const books = (await getDocs(postsQuery)).docs.map((doc) =>
            doc.data()
          );
          return { data: books };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ['Books'],
    }),
    getRecommendedBooks: builder.query<Books | object, number>({
      queryFn: async (yearLimit: number) => {
        try {
          const ref = collectionGroup(firestore, 'books');
          const postsQuery = query(
            ref,
            where('publicationYear', '!=', NaN), //can't compare with NaN so skip them
            where('publicationYear', '<=', yearLimit)
          );
          // console.log(postsQuery);

          const recommendedBooks = (await getDocs(postsQuery)).docs.map((doc) =>
            doc.data()
          );
          return { data: recommendedBooks };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ['Books'],
    }),
    createBook: builder.mutation<object | string, Book>({
      queryFn: async (bookData: Book) => {
        try {
          const ref = doc(firestore, 'books', bookData.id);
          await setDoc(ref, bookData);
          return { data: 'Book has been created' };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ['Books'],
    }),
    editBook: builder.mutation<object | string, Book>({
      queryFn: async (bookData: Book) => {
        try {
          const ref = doc(firestore, 'books', bookData.id);
          await updateDoc(ref, bookData);
          return { data: 'Book has been edited' };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ['Books'],
    }),
    deleteBook: builder.mutation<object | string, string>({
      queryFn: async (id: string) => {
        try {
          const ref = doc(firestore, 'books', id);
          await deleteDoc(ref);
          return { data: 'Book has been deleted' };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ['Books'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useCreateBookMutation,
  useEditBookMutation,
  useDeleteBookMutation,
  useGetRecommendedBooksQuery,
} = apiSlice;
