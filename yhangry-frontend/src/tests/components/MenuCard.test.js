import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, it, expect, beforeEach } from "jest";
import configureStore from "redux-mock-store";
import MenuCard from "./MenuCard";
import thunk from "redux-thunk";

const mockStore = configureStore([thunk]);

describe("MenuCard", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      setMenus: {
        guests: 2,
      },
    });
  });

  const menu = {
    id: 1,
    name: "Test Menu",
    description: "This is a test menu",
    image: "https://via.placeholder.com/150",
    cuisines: [{ id: 1, name: "Italian" }],
    price_per_person: 20,
    min_spend: 40,
  };

  it("renders the menu card", () => {
    render(
      <Provider store={store}>
        <MenuCard menu={menu} />
      </Provider>
    );

    expect(screen.getByText("Test Menu")).toBeInTheDocument();
    expect(screen.getByText("This is a test menu")).toBeInTheDocument();
    expect(screen.getByText("£40.00")).toBeInTheDocument();
  });
});
