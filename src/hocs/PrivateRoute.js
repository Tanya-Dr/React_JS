import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { selectAuth } from "../store/profile/selector";

export const PrivateRoute = ({ ...props }) => {
  const authed = useSelector(selectAuth);

  return authed ? <Route {...props} /> : <Redirect to="/login" />;
};
