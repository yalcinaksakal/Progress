import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
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
      state.token = token;
      state.isLoggedIn = true;
      state.userName = userName;
      state.userFamilyName = userFamilyName;
      state.email = email;
      state.locale = locale;
      state.userPicture = picture;
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
      state.userName = null;
      state.userFamilyName = null;
      state.email = null;
      state.locale = "en-GB";
      state.userPicture = null;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
