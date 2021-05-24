import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  status: "",
};

const googleSlice = createSlice({
  name: "google",
  initialState,
  reducers: {
    setState(state, action) {
      state.isLogin = action.payload.isLogin;
      state.status = action.payload.status;
    },
  },
});

export const loginActions = googleSlice.actions;

export default googleSlice.reducer;
