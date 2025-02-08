import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, it, expect, beforeEach } from "jest";
import configureStore from "redux-mock-store";
import CuisineFilter from "./CuisineFilter";
import thunk from "redux-thunk";

const mockStore = configureStore([thunk]);

describe("CuisineFilter", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      setMenus: {
        cuisines: [
          { name: "Italian", count: 5 },
          { name: "Chinese", count: 3 },
        ],
        selectedCuisine: null,
      },
    });
  });

  it("renders the cuisine filters", () => {
    render(
      <Provider store={store}>
        <CuisineFilter />
      </Provider>
    );

    expect(screen.getByText("All (8)")).toBeInTheDocument();
    expect(screen.getByText("Italian (5)")).toBeInTheDocument();
    expect(screen.getByText("Chinese (3)")).toBeInTheDocument();
  });

  it("handles filter click", () => {
    render(
      <Provider store={store}>
        <CuisineFilter />
      </Provider>
    );

    fireEvent.click(screen.getByText("Italian (5)"));
    const actions = store.getActions();
    expect(actions[0].type).toEqual("setMenus/setSelectedCuisine");
    expect(actions[0].payload).toEqual("Italian");
  });
});
