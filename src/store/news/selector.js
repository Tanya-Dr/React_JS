import { REQUEST_STATUS } from "../../constants";

export const selectNews = (state) => state.news.data;

export const selectNewsLoading = (state) =>
  state.news.request.status === REQUEST_STATUS.PENDING;

export const selectNewsError = (state) => state.news.request.error;
