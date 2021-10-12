import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { REQUEST_STATUS } from "../constants";

const mockState = {
  news: {
    data: [],
    request: {
      status: REQUEST_STATUS.IDLE,
      error: null,
    },
  },
};

const mockStatePending = {
  ...mockState,
  news: {
    ...mockState.news,
    request: {
      status: REQUEST_STATUS.PENDING,
      error: null,
    },
  },
};

const mockStateSucces = {
  news: {
    data: [
      { id: "id 1", title: "Mock News 1", url: "mockurl 1" },
      { id: "id 2", title: "Mock News 2", url: "mockurl 2" },
    ],
    request: {
      status: REQUEST_STATUS.SUCCESS,
      error: null,
    },
  },
};

const mockStateError = {
  ...mockState,
  news: {
    ...mockState.news,
    request: {
      status: REQUEST_STATUS.ERROR,
      error: "Error",
    },
  },
};

const store = configureStore([thunk]);

export const mockStore = store(() => mockState);
export const mockStoreSucces = store(() => mockStateSucces);
export const mockStoreError = store(() => mockStateError);
export const mockStorePending = store(() => mockStatePending);
