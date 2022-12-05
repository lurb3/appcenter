import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    email: '',
    _id: '',
  },
  reducers: {
    updateUser: (state, { payload }) => {
      return state = { ...payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
