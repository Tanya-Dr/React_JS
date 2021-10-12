// import { AUTHORS } from "../../constants";

// export const selectName = (state) =>
//   state.profile.profile.name ? state.profile.profile.name : AUTHORS.human;

export const selectAuth = (state) => state.profile.authorized;
export const selectProfileError = (state) => state.profile.error;

export const selectProfile = (state) => state.profile.profile;
export const selectName = (state) => state.profile.profile.name;
