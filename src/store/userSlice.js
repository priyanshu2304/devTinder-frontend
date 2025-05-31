import { createSlice } from '@reduxjs/toolkit';
import axios from '../utils/axiosInstance';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removeUser: async (state, action) => {
      try {
        const resp = await axios.post('/logout');
        if (resp) {
          return null;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
