import { SET_AUTH, SET_ERROR, SET_PROFILE } from "./actionTypes";

const initialState = {
  //profile will be stored like this {usesrTd, name, dateBirth, gender}
  profile: {},
  authorized: false,
  error: null,
};

export const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
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
    case SET_PROFILE: {
      return {
        ...state,
        profile: payload,
      };
    }
    default:
      return state;
  }
};
