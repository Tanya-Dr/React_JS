import { Checkbox, FormControlLabel } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { PROFILE_TOGGLE_SHOW } from "../../store/actionTypes";
import "./Profile.css";

export const Profile = () => {
  const { showName, name } = useSelector((state) => state);
  const dispatch = useDispatch();

  const toggleShow = () => {
    dispatch({
      type: PROFILE_TOGGLE_SHOW,
    });
  };

  return (
    <div className="App">
      <div className="App_openedChat home">
        <h2 className="openedChat__header">PROFILE</h2>
        <div className="profile">
          <FormControlLabel
            value="Show name"
            control={
              <Checkbox
                checked={showName}
                onChange={toggleShow}
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            }
            label="Show name"
            labelPlacement="start"
          />
          {showName && <div className="profile__name">{name}</div>}
        </div>
      </div>
    </div>
  );
};
