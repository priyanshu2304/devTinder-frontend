import { createSlice } from '@reduxjs/toolkit';
import axios from '../utils/axiosInstance';

const userSlice = createSlice({
  name: 'user',
  initialState: { isUserChecked: false },
  reducers: {
    addUser: (state, action) => {
      return { isUserChecked: true, ...action.payload };
    },
    removeUser: async (state, action) => {
      try {
        const resp = await axios.post('/logout');
        if (resp) {
          return { isUserChecked: true };
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
