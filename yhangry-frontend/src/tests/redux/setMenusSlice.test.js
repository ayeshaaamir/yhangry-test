import setMenusSlice, {
  fetchSetMenus,
  setGuests,
  resetMenus,
  setSelectedCuisine,
} from "./setMenusSlice";
import { describe, it, expect, beforeEach } from "jest";

describe("setMenusSlice", () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      menus: [],
      cuisines: [],
      guests: 1,
      page: 1,
      totalItems: 0,
      loading: false,
      error: null,
      selectedCuisine: null,
    };
  });

  it("should handle setGuests", () => {
    const nextState = setMenusSlice(initialState, setGuests(2));
    expect(nextState.guests).toEqual(2);
  });

  it("should handle resetMenus", () => {
    const nextState = setMenusSlice(initialState, resetMenus());
    expect(nextState.menus).toEqual([]);
    expect(nextState.page).toEqual(1);
  });

  it("should handle setSelectedCuisine", () => {
    const nextState = setMenusSlice(
      initialState,
      setSelectedCuisine("Italian")
    );
    expect(nextState.selectedCuisine).toEqual("Italian");
  });

  it("should handle fetchSetMenus.pending", () => {
    const nextState = setMenusSlice(initialState, fetchSetMenus.pending());
    expect(nextState.loading).toEqual(true);
  });

  it("should handle fetchSetMenus.fulfilled", () => {
    const payload = {
      data: [{ id: 1, name: "Test Menu" }],
      cuisines: [{ id: 1, name: "Italian" }],
      page: 1,
      pagination: { totalItems: 10 },
    };
    const nextState = setMenusSlice(
      initialState,
      fetchSetMenus.fulfilled(payload)
    );
    expect(nextState.loading).toEqual(false);
    expect(nextState.menus).toEqual(payload.data);
    expect(nextState.cuisines).toEqual(payload.cuisines);
    expect(nextState.page).toEqual(payload.page);
    expect(nextState.totalItems).toEqual(payload.pagination.totalItems);
  });

  it("should handle fetchSetMenus.rejected", () => {
    const error = { message: "Error" };
    const nextState = setMenusSlice(
      initialState,
      fetchSetMenus.rejected(error)
    );
    expect(nextState.loading).toEqual(false);
    expect(nextState.error).toEqual(error);
  });
});
