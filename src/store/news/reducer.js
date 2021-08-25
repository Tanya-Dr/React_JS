import { REQUEST_STATUS } from "../../constants";
import { REQUEST_ERROR, REQUEST_PENDING, REQUEST_SUCCESS } from "./actionTypes";

const initialState = {
  data: [],
  request: {
    status: REQUEST_STATUS.IDLE,
    error: null,
  },
};

export const newsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REQUEST_PENDING: {
      return {
        ...state,
        data: [],
        request: {
          ...state.request,
          error: null,
          status: REQUEST_STATUS.PENDING,
        },
      };
    }
    case REQUEST_SUCCESS: {
      return {
        ...state,
        data: payload,
        request: {
          ...state.request,
          status: REQUEST_STATUS.SUCCESS,
        },
      };
    }
    case REQUEST_ERROR: {
      return {
        ...state,
        request: {
          ...state.request,
          error: payload,
          status: REQUEST_STATUS.ERROR,
        },
      };
    }
    default:
      return state;
  }
};
