import { put, takeLatest, delay } from "redux-saga/effects";
import { AUTHORS } from "../../constants";
import { addMessage } from "./actions";
import { ADD_MESSAGE } from "./actionTypes";

function* onAddMsgWithSaga(action) {
  if (action.payload.message.author !== AUTHORS.robot) {
    yield delay(1500);
    yield put(
      addMessage(action.payload.chatId, {
        id: Date.now(),
        text: "Hello from saga",
        author: AUTHORS.robot,
      })
    );
  }
}

export function* mySaga() {
  yield takeLatest(ADD_MESSAGE, onAddMsgWithSaga);
}
