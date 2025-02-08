import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, it, expect, beforeEach } from "jest";
import configureStore from "redux-mock-store";
import GuestInput from "./GuestInput";
import thunk from "redux-thunk";

const mockStore = configureStore([thunk]);

describe("GuestInput", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      setMenus: {
        guests: 1,
        selectedCuisine: null,
      },
    });
  });

  it("renders the guest input", () => {
    render(
      <Provider store={store}>
        <GuestInput />
      </Provider>
    );

    expect(screen.getByLabelText("Guests")).toBeInTheDocument();
    expect(screen.getByDisplayValue("1")).toBeInTheDocument();
  });

  it("increments guests", () => {
    render(
      <Provider store={store}>
        <GuestInput />
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: /plus/i }));
    const actions = store.getActions();
    expect(actions[0].type).toEqual("setMenus/setGuests");
    expect(actions[0].payload).toEqual(2);
  });

  it("decrements guests", () => {
    store = mockStore({
      setMenus: {
        guests: 2,
        selectedCuisine: null,
      },
    });

    render(
      <Provider store={store}>
        <GuestInput />
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: /minus/i }));
    const actions = store.getActions();
    expect(actions[0].type).toEqual("setMenus/setGuests");
    expect(actions[0].payload).toEqual(1);
  });
});
