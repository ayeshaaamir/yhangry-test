import { configureStore } from "@reduxjs/toolkit";
import { describe, it, expect } from "jest";
import setMenusReducer from "./setMenusSlice";

describe("store", () => {
  it("should configure the store with setMenusReducer", () => {
    const store = configureStore({
      reducer: {
        setMenus: setMenusReducer,
      },
    });

    expect(store.getState().setMenus).toEqual({
      menus: [],
      cuisines: [],
      guests: 1,
      page: 1,
      totalItems: 0,
      loading: false,
      error: null,
      selectedCuisine: null,
    });
  });
});
