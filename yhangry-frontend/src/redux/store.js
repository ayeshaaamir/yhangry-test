import { configureStore } from "@reduxjs/toolkit";
import setMenusReducer from "./setMenusSlice";

export const store = configureStore({
  reducer: {
    setMenus: setMenusReducer,
  },
});
