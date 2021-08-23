import { AUTHORS } from "../../constants";
import {
  ADD_CHAT_TO_MSG_LIST,
  ADD_MESSAGE,
  DELETE_CHAT_FROM_MSG_LIST,
  SET_ERROR_MSG,
  SET_MESSAGES,
} from "./actionTypes";

// const initialState = {
//   //to be stored like this {[chatId]:[{id, text, author}]}
//   messageList: {
//     chat1: [{ id: "chat1-1", text: "Hello world!", author: AUTHORS.human }],
//     chat2: [{ id: "chat2-1", text: "This is chat2", author: AUTHORS.human }],
//     chat3: [],
//   },
// };

const initialState = {
  //messageList will be stored like this {[chatId]:[{author, chatId, id, text}]}
  messageList: {},
  error: null,
};

export const messagesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // case ADD_MESSAGE: {
    //   const currentList = state.messageList[payload.chatId] || [];
    //   return {
    //     ...state,
    //     messageList: {
    //       ...state.messageList,
    //       [payload.chatId]: [
    //         ...currentList,
    //         {
    //           ...payload.message,
    //         },
    //       ],
    //     },
    //   };
    // }
    // case ADD_CHAT_TO_MSG_LIST: {
    //   return {
    //     ...state,
    //     messageList: {
    //       ...state.messageList,
    //       [payload.chatId]: [],
    //     },
    //   };
    // }
    // case DELETE_CHAT_FROM_MSG_LIST: {
    //   const newState = { ...state };
    //   delete newState.messageList[payload.chatId];
    //   return newState;
    // }
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
