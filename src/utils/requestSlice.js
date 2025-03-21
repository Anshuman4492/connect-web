import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "Request",
  initialState: null,
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      const newRequest = state.filter(
        (request) => request._id !== action.payload
      );
      return newRequest;
    },
  },
});
export const { addRequests, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
