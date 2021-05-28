import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  text: "",
  cancelHandler: () => {},
  confirmHandler: () => {},
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setState(state, action) {
      state.show = action.payload.show;
      state.text = action.payload.text;
      state.cancelHandler = action.payload.cancelHandler;
      state.confirmHandler = action.payload.confirmHandler;
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;
