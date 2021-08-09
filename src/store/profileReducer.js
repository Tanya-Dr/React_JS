import { PROFILE_TOGGLE_SHOW } from "./actionTypes";

const initialState = {
  showName: false,
  name: "No name",
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_TOGGLE_SHOW: {
      return {
        ...state,
        showName: !state.showName,
      };
    }
    default:
      return state;
  }
};
