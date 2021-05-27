import { createSlice } from "@reduxjs/toolkit";
import {
  calculateRemainingTime,
  retriveStoredToken,
  setCookie,
} from "../../lib/helper";

const initialState = {
  isLoggedIn: false,
  token: null,
  email: null,
  userName: null,
  userFamilyName: null,
  locale: "en-GB",
  userPicture: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const { token, email, userName, userFamilyName, locale, picture } =
        action.payload;
      state.token = token;
      state.isLoggedIn = true;
      state.userName = userName;
      state.userFamilyName = userFamilyName;
      state.email = email;
      state.locale = locale;
      state.userPicture = picture;
      setCookie({ token });
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.remainingTime = 0;
      state.userName = null;
      state.loginType = null;
      localStorage.removeItem("token");
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    // remainingTimeHandler(state) {
    //   state.remainingTime--;
    // },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
