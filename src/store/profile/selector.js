import { AUTHORS } from "../../constants";

export const selectName = (state) =>
  state.profile.name ? state.profile.name : AUTHORS.human;

export const selectAuth = (state) => state.profile.authorized;
export const selectProfileError = (state) => state.profile.error;
