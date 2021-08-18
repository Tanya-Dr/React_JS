import "./Router.css";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import Chats from "../Chats";
import { Home } from "../Home";
import { Profile } from "../Profile";

export const Router = () => {
  return (
    <BrowserRouter>
      <header className="nav center">
        <ul>
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
          <Home
            id="nochat"
            txt="There is wrong chat, please select chat from"
          />
        </Route>
        <Route path="/" exact>
          <Home id="home" txt="WELCOME" />
        </Route>
        <Route path="*">
          <Home id="pageNotFound" txt="Page not found" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
