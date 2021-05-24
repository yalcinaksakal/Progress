import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth-slice";
import googleReducer from "./auth/google-slice";

const store = configureStore({
  reducer: { auth: authReducer, login: googleReducer },
});

export default store;
