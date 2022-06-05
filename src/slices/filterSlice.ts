import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { RootState } from '../store';

const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({
  activeFilter: 'byYear',
});

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filtersChanged: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
});

const { actions, reducer } = filtersSlice;

export default reducer;

export const { selectAll } = filtersAdapter.getSelectors<RootState>(
  (state) => state.filters
);

export const { filtersChanged } = actions;
