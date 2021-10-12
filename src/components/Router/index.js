import "./Router.css";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import Chats from "../Chats";
import { Home } from "../Home";
import { Profile } from "../Profile";
import { News } from "../News";
import { Login } from "../Login";
import { PrivateRoute } from "../../hocs/PrivateRoute";
import { PublicRoute } from "../../hocs/PublicRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { connectProfileToFB } from "../../store/profile/actions";
import { selectAuth } from "../../store/profile/selector";
import { Logout } from "../Logout";

export const Router = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connectProfileToFB());
  }, []);

  const authed = useSelector(selectAuth);

  return (
    <BrowserRouter>
      <header className="nav center">
        <ul>
          <li>
            <Link to="/news">NEWS</Link>
          </li>
          <li>
            {authed ? (
              <Link to="/profile">PROFILE</Link>
            ) : (
              <Link to="/login">LOGIN</Link>
            )}
          </li>
          <li>{authed && <Link to="/chats">CHATS</Link>}</li>
        </ul>

        {authed && <Logout />}
      </header>

      <Switch>
        <PrivateRoute path="/chats/:chatId?">
          <Chats />
        </PrivateRoute>
        <PrivateRoute path="/profile">
          <Profile />
        </PrivateRoute>
        <Route path="/news">
          <News />
        </Route>
        <PublicRoute path="/login" exact>
          <Login />
        </PublicRoute>
        <PublicRoute path="/signup" exact>
          <Login isSignUp />
        </PublicRoute>
        <PrivateRoute path="/nochat">
          <Home
            id="nochat"
            txt="There is wrong chat, please select chat from"
          />
        </PrivateRoute>
        <Route path="/" exact>
          <Home id="home" txt="WELCOME" />
        </Route>
        <Route path="/home" exact>
          <Home id="home" txt="WELCOME" />
        </Route>
        <Route path="*">
          <Home id="pageNotFound" txt="Page not found" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
