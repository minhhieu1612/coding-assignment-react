import { configureStore } from '@reduxjs/toolkit';
import users from './users';
import tickets from './tickets';
import filterTicket from './filterTicket';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    tickets,
    users,
    filterTicket,
  },
});

export type RootStoreType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
