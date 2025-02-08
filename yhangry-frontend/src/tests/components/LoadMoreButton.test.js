import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, it, expect, beforeEach } from "jest";
import configureStore from "redux-mock-store";
import LoadMoreButton from "./LoadMoreButton";
import thunk from "redux-thunk";

const mockStore = configureStore([thunk]);

describe("LoadMoreButton", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      setMenus: {
        page: 1,
        guests: 1,
        selectedCuisine: null,
        totalItems: 10,
        menus: Array(6).fill({}),
      },
    });
  });

  it("renders the load more button", () => {
    render(
      <Provider store={store}>
        <LoadMoreButton />
      </Provider>
    );

    expect(screen.getByText("Load More")).toBeInTheDocument();
  });

  it("does not render the load more button when all items are loaded", () => {
    store = mockStore({
      setMenus: {
        page: 1,
        guests: 1,
        selectedCuisine: null,
        totalItems: 6,
        menus: Array(6).fill({}),
      },
    });

    render(
      <Provider store={store}>
        <LoadMoreButton />
      </Provider>
    );

    expect(screen.queryByText("Load More")).not.toBeInTheDocument();
  });

  it("handles load more click", () => {
    render(
      <Provider store={store}>
        <LoadMoreButton />
      </Provider>
    );

    fireEvent.click(screen.getByText("Load More"));
    const actions = store.getActions();
    expect(actions[0].type).toEqual("setMenus/fetchSetMenus/pending");
  });
});
