import { createSlice } from '@reduxjs/toolkit';

const feedSlice = createSlice({
  name: 'feed',
  initialState: {
    userFeed: [],
    page: 1,
    totalCount: 0,
  },
  reducers: {
    addFeed: (state, action) => {
      const {
        userFeed = [],
        page = 1,
        totalCount = 0,
        limit = 0,
      } = action.payload;

      state.userFeed = [...state.userFeed, ...userFeed];
      state.page = page;
      state.totalCount = totalCount;
      state.limit = limit;
    },
    clearFeed: (state) => {
      state.userFeed = [];
      state.page = 1;
      state.totalCount = 0;
    },
  },
});

export const { addFeed, clearFeed } = feedSlice.actions;
export default feedSlice.reducer;
