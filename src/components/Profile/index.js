import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { AUTHORS } from "../../constants";
import {
  changeProfileWithFB,
  connectProfileDBToFB,
} from "../../store/profile/actions";
import { selectProfile } from "../../store/profile/selector";
import { SignUp } from "../Login/SignUp";
import { useEffect, useState } from "react";

export const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);

  const [edit, setEdit] = useState(true);
  const [errorName, setErrorName] = useState(false);

  const handleEdit = (e) => {
    e.preventDefault();
    setEdit((prevEdit) => false);
  };

  const handleSubmit = (e, name, dateBirth, gender) => {
    e.preventDefault();
    if (!name) {
      setErrorName(true);
      return;
    } else {
      setErrorName(false);
    }
    setEdit(true);
    dispatch(changeProfileWithFB(name, dateBirth, gender));
  };

  useEffect(() => {
    dispatch(connectProfileDBToFB());
  }, []);

  return (
    <div className="App">
      <div className="App_openedChat home">
        <h2 className="App_openedChat__header">PROFILE</h2>
        <form className="profile__form">
          <div className="profile__header">
            <h2>
              THIS IS PROFILE OF{" "}
              {!profile.name || profile.name === AUTHORS.human ? (
                <span className="profile__text">your name</span>
              ) : (
                profile.name
              )}
            </h2>
            <Button
              onClick={handleEdit}
              variant="outlined"
              color="primary"
              endIcon={<EditOutlinedIcon />}
            >
              Edit
            </Button>
          </div>
          <SignUp
            defaultName={profile.name}
            readOnlyValue={edit}
            defaultDate={profile.dateBirth}
            defaultGender={profile.gender}
            txtButton="Save"
            profilePage={true}
            onSubmit={handleSubmit}
            errorName={errorName}
          />
        </form>
      </div>
    </div>
  );
};
