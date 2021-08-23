import { ADD_CHAT, DELETE_CHAT, SET_CHATS, SET_ERROR } from "./actionTypes";

const initialState = {
  //chatList will be stored like this [{id, name}]
  chatList: [],
  error: null,
};

export const chatsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // case ADD_CHAT: {
    //   return {
    //     ...state,
    //     chatList: [
    //       ...state.chatList,
    //       {
    //         id: payload.chatId,
    //         name: payload.name,
    //       },
    //     ],
    //   };
    // }
    // case DELETE_CHAT: {
    //   return {
    //     ...state,
    //     chatList: [...state.chatList].filter(
    //       (chat) => chat.id !== payload.chatId
    //     ),
    //   };
    // }
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
