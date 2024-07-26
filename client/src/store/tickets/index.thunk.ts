import { createAsyncThunk } from "@reduxjs/toolkit";
import { ticketService } from "../../services";

export const getAllTickets = createAsyncThunk('tickets/getAll', async () => {
  const response = await ticketService.getAll();

  return response.data;
});

export const getTicketById = createAsyncThunk(
  'tickets/getById',
  async (payload: number) => {
    const response = await ticketService.getById(payload);

    return response.data;
  }
);

export const createTicket = createAsyncThunk(
  'tickets/create',
  async (payload: string) => {
    const response = await ticketService.create(payload);

    return response;
  }
);

export type AssignTicketPayloadType = {
  id: number;
  userId: number;
};

export const assignTicketToUser = createAsyncThunk(
  'tickets/assignToUser',
  async (payload: AssignTicketPayloadType) => {
    const response = await ticketService.assignUser(payload.id, payload.userId);

    return { ...response, data: payload };
  }
);

export const unassignTicket = createAsyncThunk(
  'tickets/unassign',
  async (payload: number) => {
    const response = await ticketService.unassign(payload);

    return { ...response, data: payload };
  }
);

export const completeTicket = createAsyncThunk(
  'tickets/complete',
  async (payload: number) => {
    const response = await ticketService.complete(payload);

    return { ...response, data: payload };
  }
);

export const incompleteTicket = createAsyncThunk(
  'tickets/incomplete',
  async (payload: number) => {
    const response = await ticketService.incomplete(payload);

    return { ...response, data: payload };
  }
);