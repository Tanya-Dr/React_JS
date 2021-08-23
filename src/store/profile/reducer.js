import {
  PROFILE_CHANGE_NAME,
  PROFILE_TOGGLE_SHOW,
  SET_AUTH,
  SET_ERROR,
} from "./actionTypes";

const initialState = {
  showName: false,
  name: "",
  authorized: false,
  error: null,
};

export const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PROFILE_TOGGLE_SHOW: {
      return {
        ...state,
        showName: !state.showName,
      };
    }
    case PROFILE_CHANGE_NAME: {
      return {
        ...state,
        name: payload,
      };
    }
    case SET_AUTH: {
      return {
        ...state,
        authorized: payload,
        error: null,
      };
    }
    case SET_ERROR: {
      return {
        ...state,
        error: payload,
      };
    }
    default:
      return state;
  }
};
