import { AUTHORS } from "../../constants";

export const selectName = (state) =>
  state.profile.name && state.profile.name.length !== 0
    ? state.profile.name
    : AUTHORS.human;
