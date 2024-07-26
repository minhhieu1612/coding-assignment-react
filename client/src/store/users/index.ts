import { createSlice } from '@reduxjs/toolkit';
import { User } from '@acme/shared-models';
import { RootStoreType } from '..';
import { getAllUsers } from './index.thunk';


const initialState: { [key: number]: User } = {};

const slice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      return (action.payload as User[]).reduce(
        (acc, item) => ({ ...acc, [item.id]: item }),
        {}
      );
    });
  },
});

export const usersSelector = (state: RootStoreType) => state.users;

export default slice.reducer;
