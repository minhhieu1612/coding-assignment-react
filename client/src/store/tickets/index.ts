import { createSlice } from '@reduxjs/toolkit';
import { Ticket } from '@acme/shared-models';
import { RootStoreType } from '..';
import { assignTicketToUser, completeTicket, createTicket, getAllTickets, getTicketById, incompleteTicket, unassignTicket } from './index.thunk';

const initialState: Ticket[] = [];

const slice = createSlice({
  name: 'tickets',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTickets.fulfilled, (_state, action) => {
      return action.payload as Ticket[];
    });

    builder.addCase(getTicketById.fulfilled, (state, action) => {
      const ticketIndex = state.findIndex(
        (item) => item.id === action.payload?.id
      );

      if (ticketIndex < 0) {
        state.push(action.payload as Ticket);
      } else {
        state[ticketIndex] = action.payload as Ticket;
      }
    });

    builder.addCase(createTicket.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.push(action.payload.data as Ticket);
      }
    });

    builder.addCase(assignTicketToUser.fulfilled, (state, action) => {
      if (action.payload.success) {
        const itemIndex = state.findIndex(
          (item) => item.id === action.payload.data.id
        );

        state[itemIndex].assigneeId = action.payload.data.userId;
      }
    });

    builder.addCase(unassignTicket.fulfilled, (state, action) => {
      if (action.payload.success) {

        const itemIndex = state.findIndex((item) => item.id === action.payload.data);
        
        state[itemIndex].assigneeId = null;
      }
    });

    builder.addCase(completeTicket.fulfilled, (state, action) => {
      if (action.payload.success) {
        const itemIndex = state.findIndex(
          (item) => item.id === action.payload.data
        );

        state[itemIndex].completed = true;
      }
    });

    builder.addCase(incompleteTicket.fulfilled, (state, action) => {
      if (action.payload.success) {
        const itemIndex = state.findIndex(
          (item) => item.id === action.payload.data
        );

        state[itemIndex].completed = false;
      }
    });
  },
});

export const ticketsSelector = (state: RootStoreType) => state.tickets;

export default slice.reducer;
