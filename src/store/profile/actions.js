import { SET_AUTH, SET_ERROR, SET_PROFILE } from "./actionTypes";
import { db, auth } from "../../services/firebase";

const setAuth = (authed) => ({
  type: SET_AUTH,
  payload: authed,
});

const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

const setProfile = (profile) => ({
  type: SET_PROFILE,
  payload: profile,
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

export const loginWithFB = (email, pass) => async (dispatch) => {
  try {
    await auth.signInWithEmailAndPassword(email, pass);
  } catch (e) {
    dispatch(setError(e.message));
  }
};

export const signUpWithFB =
  (email, pass, name, dateBirth, gender) => async (dispatch) => {
    try {
      await auth.createUserWithEmailAndPassword(email, pass);
      const userId = auth.currentUser.uid;
      await db.ref("profile").child(userId).set({
        userId,
        name,
        dateBirth,
        gender,
      });
      // await db
      //   .ref("profile")
      //   .child(userId)
      //   .on("value", (snapshot) => {
      //     dispatch(setProfile(snapshot.val()));
      //   });
      // await db.ref("profile").on("child_added", (snapshot) => {
      //   dispatch(setProfile(snapshot.val()));
      // });
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

export const connectProfileDBToFB = () => async (dispatch) => {
  try {
    const userId = auth.currentUser.uid;
    await db.ref("profile").child(userId).off();
    await db
      .ref("profile")
      .child(userId)
      .on("value", (snapshot) => {
        dispatch(setProfile(snapshot.val()));
      });
  } catch (e) {
    dispatch(setError(e.message));
  }
};

export const changeProfileWithFB =
  (name, dateBirth, gender) => async (dispatch) => {
    const userId = auth.currentUser.uid;
    try {
      await db.ref("profile").child(userId).set({
        userId,
        name,
        dateBirth,
        gender,
      });
    } catch (e) {
      dispatch(setError(e.message));
    }
  };
