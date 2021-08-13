import { combineReducers, createStore } from "redux";
import { chatsReducer } from "./chats/reducer";
import { messagesReducer } from "./messages/reducer";
import { profileReducer } from "./profile/reducer";

export const store = createStore(
  combineReducers({
    profile: profileReducer,
    chats: chatsReducer,
    messages: messagesReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
