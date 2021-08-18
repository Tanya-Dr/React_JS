import { PROFILE_CHANGE_NAME } from "./actionTypes";

export const changeName = (newName) => ({
  type: PROFILE_CHANGE_NAME,
  payload: newName,
});
