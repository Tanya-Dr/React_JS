import { REQUEST_STATUS } from "../../../constants";
import { getNewsError, getNewsPending, getNewsSuccess } from "../actions";
import { newsReducer } from "../reducer";

describe("newsReducer", () => {
  it("returns state with status loading(1) after getNewsPending action", () => {
    const expected = {
      data: [],
      request: {
        status: REQUEST_STATUS.PENDING,
        error: null,
      },
    };

    const received = newsReducer(undefined, getNewsPending());
    expect(received).toEqual(expected);
  });

  it("returns state with status error(3) and value error after getNewsError action", () => {
    const received = newsReducer(undefined, getNewsError("error"));
    expect(received).toMatchSnapshot();
  });

  it("returns state with status success(2) and list of news in data after getNewsSuccess action", () => {
    const received = newsReducer(undefined, getNewsSuccess(["news"]));
    expect(received).toMatchSnapshot();
  });
});
