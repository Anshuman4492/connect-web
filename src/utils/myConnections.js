import { createSlice } from "@reduxjs/toolkit";

const myConnectionSlice = createSlice({
  name: "myConnection",
  initialState: null,
  reducers: {
    addConnections: (state, action) => {
      return action.payload;
    },
  },
});

export const { addConnections } = myConnectionSlice.actions;
export default myConnectionSlice.reducer;
