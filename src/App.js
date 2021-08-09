import { Router } from "./components/Router";
import { Provider } from "react-redux";
import { store } from "./store";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="wrapper">
        <Router />
      </div>
    </Provider>
  );
}

export default App;
