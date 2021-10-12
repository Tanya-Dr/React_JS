import { SET_CHATS, SET_ERROR } from "./actionTypes";
import { db } from "../../services/firebase";

const setChats = (chats) => ({
  type: SET_CHATS,
  payload: chats,
});

const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const connectChatsToFB = () => async (dispatch) => {
  try {
    await db.ref("chatList").off();
    await db.ref("chatList").on("value", (snapshot) => {
      let newChats = [];
      snapshot.forEach((snap) => {
        const currentChat = snap.val();
        if (Object.keys(currentChat).length !== 0) {
          newChats.push(currentChat);
        }
      });
      dispatch(setChats(newChats));
    });
  } catch (e) {
    dispatch(setError(e.message));
  }
};

export const addChatWithFB =
  (id, name, robot = false) =>
  async (dispatch) => {
    try {
      await db.ref("chatList").child(id).set({
        id,
        name,
        robot,
      });
    } catch (e) {
      dispatch(setError(e.message));
    }
  };

export const deleteChatWithFB = (id) => async (dispatch) => {
  try {
    await db.ref("chatList").child(id).remove();
  } catch (e) {
    dispatch(setError(e.message));
  }
};
