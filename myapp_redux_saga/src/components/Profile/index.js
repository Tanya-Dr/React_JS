import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@material-ui/core";
import { AUTHORS } from "../../constants";
import { changeName } from "../../store/profile/actions";
import { selectName } from "../../store/profile/selector";
import { useInput } from "../../utils/UseInput";

export const Profile = () => {
  const name = useSelector(selectName);
  const dispatch = useDispatch();
  const { value, handleChange, reset } = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value) {
      return;
    }

    dispatch(changeName(value));
    reset();
  };

  return (
    <div className="App">
      <div className="App_openedChat home">
        <h2 className="App_openedChat__header">PROFILE</h2>
        <form className="profile__form" onSubmit={handleSubmit}>
          <h2>
            THIS IS PROFILE OF{" "}
            {!name || name === AUTHORS.human ? (
              <span className="profile__text">enter your name</span>
            ) : (
              name
            )}
          </h2>
          <TextField
            id="outlined-basic"
            label="your name"
            variant="outlined"
            value={value}
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save name
          </Button>
        </form>
      </div>
    </div>
  );
};
