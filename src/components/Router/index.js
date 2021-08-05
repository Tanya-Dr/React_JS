import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import Chats from "../Chats";
import { Home } from "../Home";
import { NoChat } from "../NoChat";
import { Profile } from "../Profile";
import "./Router.css";

export const Router = () => {
  return (
    <BrowserRouter>
      <header className="nav center">
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/chats">CHATS</Link>
          </li>
          <li>
            <Link to="/profile">PROFILE</Link>
          </li>
        </ul>
      </header>

      <Switch>
        <Route path="/chats/:chatId?">
          <Chats />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/nochat">
          <NoChat />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="*">
          <h2 className="center">Page not found</h2>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
