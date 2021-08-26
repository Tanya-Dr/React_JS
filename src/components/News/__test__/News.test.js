import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { News } from "..";
import {
  mockStore,
  mockStoreError,
  mockStorePending,
  mockStoreSucces,
} from "../../../store/MockStore";
import {
  getNews,
  getNewsError,
  getNewsSuccess,
} from "../../../store/news/actions";

describe("News", () => {
  describe("snapshot test", () => {
    it("matches snapshot with no news", () => {
      const component = render(
        <Provider store={mockStore}>
          <News />
        </Provider>
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe("functionality tests", () => {
    it("dispatches getNews on mount", () => {
      render(
        <Provider store={mockStore}>
          <News />
        </Provider>
      );

      return mockStore
        .dispatch(getNews())
        .then(() => {
          const actions = mockStore.getActions();
          expect(actions[actions.length - 1].type).toEqual(
            getNewsSuccess().type
          );
        })
        .catch((err) => {
          const actions = mockStore.getActions();
          expect(actions[actions.length - 1].type).toEqual(getNewsError().type);
        });
    });

    it("shows error message on request error", () => {
      const component = render(
        <Provider store={mockStoreError}>
          <News />
        </Provider>
      );

      const text = component.getByText("Request error");
      expect(text).toBeDefined();
    });

    it("shows CircularProgress when it's pending", () => {
      const component = render(
        <Provider store={mockStorePending}>
          <News />
        </Provider>
      );

      const text = component.getByTestId("circul-element");
      expect(text).toBeDefined();
    });

    it("shows list of news on request succes", () => {
      const component = render(
        <Provider store={mockStoreSucces}>
          <News />
        </Provider>
      );

      const list = component.getByRole("list");
      expect(list).toBeDefined();
    });
  });
});
