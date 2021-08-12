import {
  ADD_CHAT_TO_MSG_LIST,
  ADD_MESSAGE,
  DELETE_CHAT_FROM_MSG_LIST,
} from "./actionTypes";

export const addMessage = (chatId, message) => ({
  type: ADD_MESSAGE,
  payload: {
    chatId,
    message,
  },
});

export const addChatToMsgList = (chatId) => ({
  type: ADD_CHAT_TO_MSG_LIST,
  payload: { chatId },
});
export const deleteChatFromMsgList = (chatId) => ({
  type: DELETE_CHAT_FROM_MSG_LIST,
  payload: { chatId },
});
