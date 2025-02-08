import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from 'jest';
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import SetMenusPage from "./SetMenusPage";
import thunk from "redux-thunk";

const mockStore = configureStore([thunk]);

describe("SetMenusPage", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      setMenus: {
        menus: [],
        loading: false,
        guests: 1,
        selectedCuisine: null,
      },
    });
  });

  it("renders the Set Menus page", () => {
    render(
      <Provider store={store}>
        <SetMenusPage />
      </Provider>
    );

    expect(screen.getByText("Set Menus")).toBeInTheDocument();
  });

  it("displays loading state", () => {
    store = mockStore({
      setMenus: {
        menus: [],
        loading: true,
        guests: 1,
        selectedCuisine: null,
      },
    });

    render(
      <Provider store={store}>
        <SetMenusPage />
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
