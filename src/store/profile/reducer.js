import { PROFILE_CHANGE_NAME, PROFILE_TOGGLE_SHOW } from "./actionTypes";

const initialState = {
  showName: false,
  name: "",
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_TOGGLE_SHOW: {
      return {
        ...state,
        showName: !state.showName,
      };
    }
    case PROFILE_CHANGE_NAME: {
      return {
        ...state,
        name: action.payload,
      };
    }
    default:
      return state;
  }
};
