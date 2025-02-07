import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSetMenus = createAsyncThunk(
  "setMenus/fetchSetMenus",
  async ({ cuisineSlug, page, guests }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/set-menus`, {
        params: { cuisineSlug, page, limit: 6, guests },
      });
      return { ...response.data, guests, cuisineSlug, page };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const setMenusSlice = createSlice({
  name: "setMenus",
  initialState: {
    menus: [],
    cuisines: [],
    guests: 1,
    page: 1,
    totalItems: 0,
    loading: false,
    error: null,
    selectedCuisine: null,
  },

  reducers: {
    setGuests(state, action) {
      state.guests = action.payload;
    },
    resetMenus(state) {
      state.menus = [];
      state.page = 1;
    },
    setSelectedCuisine(state, action) {
      state.selectedCuisine = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSetMenus.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSetMenus.fulfilled, (state, action) => {
        state.loading = false;
        state.menus =
          action.payload.page === 1
            ? action.payload.data
            : [...state.menus, ...action.payload.data];
        state.cuisines = action.payload.cuisines;
        state.page = action.payload.page;
        state.totalItems = action.payload.pagination.totalItems;
      })
      .addCase(fetchSetMenus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setGuests, resetMenus, setSelectedCuisine } =
  setMenusSlice.actions;
export default setMenusSlice.reducer;
