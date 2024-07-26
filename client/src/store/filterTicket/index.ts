import { createSlice } from '@reduxjs/toolkit';
import { RootStoreType } from '..';
import { CompletedFilterEnum } from '../../app/utils/enum';

const initialState: { completed: CompletedFilterEnum } = { completed: CompletedFilterEnum.All };

const slice = createSlice({
  name: 'filterTicket',
  initialState: initialState,
  reducers: {
    setFilterTicket: (_state, action) => ({ completed: action.payload})
  },
});

export const filterTicketSelector = (state: RootStoreType) => state.filterTicket;

export const { setFilterTicket } = slice.actions

export default slice.reducer;
