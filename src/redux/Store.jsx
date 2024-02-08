import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/UserSlice/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default store;
