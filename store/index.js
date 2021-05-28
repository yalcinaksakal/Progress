import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth-slice";
import modalReducer from "./modal/modal-slice";

const store = configureStore({
  reducer: { auth: authReducer, modal: modalReducer },
});

export default store;
