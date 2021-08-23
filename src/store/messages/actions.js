import { AUTHORS } from "../../constants";
import {
  ADD_CHAT_TO_MSG_LIST,
  ADD_MESSAGE,
  DELETE_CHAT_FROM_MSG_LIST,
  SET_ERROR_MSG,
  SET_MESSAGES,
} from "./actionTypes";
import { db } from "../../services/firebase";

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

let timeout;

export const addMessageWithReply = (chatId, message) => (dispatch) => {
  dispatch(addMessage(chatId, message));

  if (timeout) {
    clearTimeout(timeout);
  }

  timeout = setTimeout(() => {
    dispatch(
      addMessage(chatId, {
        id: Date.now(),
        text: "Hello, can I help you?",
        author: AUTHORS.robot,
      })
    );
  }, 1500);
};

const setMessages = (messages) => ({
  type: SET_MESSAGES,
  payload: messages,
});

const setError = (error) => ({
  type: SET_ERROR_MSG,
  payload: error,
});

export const connectMessagesToFB = () => async (dispatch) => {
  try {
    await db.ref("messages").off();
    await db.ref("messages").on("value", (snapshot) => {
      let newMessages = {};
      if (!snapshot) {
        return;
      }
      snapshot.forEach((snap) => {
        const currentMsgs = snap.val();
        if (newMessages[snap.key]) {
          newMessages[snap.key].concat(Object.values(currentMsgs));
        } else {
          newMessages[snap.key] = Object.values(currentMsgs);
        }
      });
      dispatch(setMessages(newMessages));
    });
  } catch (e) {
    dispatch(setError(e.message));
  }
};

export const sendMessageWithFB = (chatId, message) => async (dispatch) => {
  try {
    await db
      .ref("messages")
      .child(chatId)
      .push({
        ...message,
        // id: `${chatId}-${Date.now()}`,
        chatId,
      });
  } catch (e) {
    dispatch(setError(e));
  }
};

export const delMsgFromDelChatWithFB = (chatId) => async (dispatch) => {
  try {
    await db.ref("messages").child(chatId).remove();
  } catch (e) {
    dispatch(setError(e));
  }
};
