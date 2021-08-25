import { SET_ERROR_MSG, SET_MESSAGES } from "./actionTypes";

const initialState = {
  //messageList will be stored like this {[chatId]:[{author, chatId, id, text}]}
  messageList: {},
  error: null,
};

export const messagesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_MESSAGES: {
      return {
        ...state,
        messageList: payload,
      };
    }
    case SET_ERROR_MSG: {
      return {
        ...state,
        error: payload,
      };
    }
    default:
      return state;
  }
};
