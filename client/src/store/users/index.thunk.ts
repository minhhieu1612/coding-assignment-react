import { createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "../../services";

export const getAllUsers = createAsyncThunk('users/getAll', async () => {
  const response = await userService.getAll();

  return response.data;
});