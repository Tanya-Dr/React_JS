import { SET_CHATS, SET_ERROR } from "./actionTypes";

const initialState = {
  //chatList will be stored like this [{id, name, robot}]
  chatList: [],
  error: null,
};

export const chatsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CHATS: {
      return {
        ...state,
        chatList: payload,
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
