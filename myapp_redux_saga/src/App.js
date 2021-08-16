import "./App.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Router } from "./components/Router";
import { persistor, store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div className="wrapper">
          <Router />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
