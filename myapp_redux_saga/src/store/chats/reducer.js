import { ADD_CHAT, DELETE_CHAT } from "./actionTypes";

const initialState = {
  //to be stored like this [{id, name}]
  chatList: [
    { id: "chat1", name: "Chat 1" },
    { id: "chat2", name: "Chat 2" },
    { id: "chat3", name: "Chat 3" },
  ],
};

export const chatsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_CHAT: {
      return {
        ...state,
        chatList: [
          ...state.chatList,
          {
            id: payload.chatId,
            name: payload.name,
          },
        ],
      };
    }
    case DELETE_CHAT: {
      return {
        ...state,
        chatList: [...state.chatList].filter(
          (chat) => chat.id !== payload.chatId
        ),
      };
    }
    default:
      return state;
  }
};
