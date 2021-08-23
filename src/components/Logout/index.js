import "./Logout.css";

import { useDispatch } from "react-redux";
import { logoutWithFB } from "../../store/profile/actions";

export const Logout = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logoutWithFB());
  };

  return (
    <button onClick={handleClick} className="logout__button">
      LOGOUT
    </button>
  );
};
