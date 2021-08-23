import { PROFILE_CHANGE_NAME, SET_AUTH, SET_ERROR } from "./actionTypes";
import { auth } from "../../services/firebase";

export const changeName = (newName) => ({
  type: PROFILE_CHANGE_NAME,
  payload: newName,
});

const setAuth = (authed) => ({
  type: SET_AUTH,
  payload: authed,
});

const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const connectProfileToFB = () => async (dispatch) => {
  try {
    await auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setAuth(true));
      } else {
        dispatch(setAuth(false));
      }
    });
  } catch (e) {
    dispatch(setError(e.message));
  }
};

export const loginWithFB = (name, pass) => async (dispatch) => {
  try {
    await auth.signInWithEmailAndPassword(name, pass);
  } catch (e) {
    dispatch(setError(e.message));
  }
};

export const signUpWithFB = (name, pass) => async (dispatch) => {
  try {
    await auth.createUserWithEmailAndPassword(name, pass);
  } catch (e) {
    dispatch(setError(e.message));
  }
};

export const logoutWithFB = () => async (dispatch) => {
  try {
    await auth.signOut();
  } catch (e) {
    dispatch(setError(e.message));
  }
};
