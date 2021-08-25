import { AUTHORS } from "../../constants";
import { SET_ERROR_MSG, SET_MESSAGES } from "./actionTypes";
import { db } from "../../services/firebase";

let timeout;

export const addMessageWithReply = (chatId, message) => (dispatch) => {
  dispatch(sendMessageWithFB(chatId, message));

  if (timeout) {
    clearTimeout(timeout);
  }

  timeout = setTimeout(() => {
    dispatch(
      sendMessageWithFB(chatId, {
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
