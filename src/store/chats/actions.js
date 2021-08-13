import { ADD_CHAT, DELETE_CHAT } from "./actionTypes";

export const addChat = (chatId, name) => ({
  type: ADD_CHAT,
  payload: {
    chatId,
    name,
  },
});

export const deleteChat = (chatId) => ({
  type: DELETE_CHAT,
  payload: { chatId },
});
