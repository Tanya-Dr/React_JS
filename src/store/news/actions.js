import { REQUEST_ERROR, REQUEST_PENDING, REQUEST_SUCCESS } from "./actionTypes";
import { API_URL } from "../../constants";

export const getNewsPending = () => ({
  type: REQUEST_PENDING,
});

export const getNewsSuccess = (news) => ({
  type: REQUEST_SUCCESS,
  payload: news,
});

export const getNewsError = (error) => ({
  type: REQUEST_ERROR,
  payload: error,
});

export const getNews = () => async (dispatch) => {
  dispatch(getNewsPending());

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    const result = await response.json();

    dispatch(getNewsSuccess(result));
  } catch (err) {
    dispatch(getNewsError(err.message));
  }
};
