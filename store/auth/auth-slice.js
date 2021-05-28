import { createSlice } from "@reduxjs/toolkit";
import { setCookie } from "../../lib/helper";

const initialState = {
  isLoggedIn: false,
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
      state.isLoggedIn = true;
      state.userName = userName;
      state.userFamilyName = userFamilyName;
      state.email = email;
      state.locale = locale;
      state.userPicture = picture;
      setCookie(token);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userName = null;
      state.userFamilyName = null;
      state.email = null;
      state.locale = "en-GB";
      state.userPicture = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
