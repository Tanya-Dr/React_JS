import "./FormChat.css";
import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  Button,
  Dialog,
  DialogTitle,
  Fab,
  FormControlLabel,
  Switch,
  TextField,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { useInput } from "../../utils/UseInput";
import { addChatWithFB } from "../../store/chats/actions";

export const FormChat = () => {
  const [visible, setVisible] = useState(false);
  const { value: name, handleChange: changeName, reset } = useInput("");
  const [valueChecked, setValueChecked] = useState(false);

  const dispatch = useDispatch();

  const handleChecked = (event) => {
    setValueChecked(event.target.checked);
  };

  const handleClose = () => setVisible(false);
  const handleOpen = () => setVisible(true);

  const onAddChat = (e) => {
    e.preventDefault();

    if (!name) {
      return;
    }

    const newIdChat = `chat${Date.now()}`;
    if (valueChecked) {
      const newName = `${name} (with robot)`;
      dispatch(addChatWithFB(newIdChat, newName, valueChecked));
    } else {
      dispatch(addChatWithFB(newIdChat, name));
    }

    reset();
    handleClose();
  };

  return (
    <>
      <Fab size="small" color="primary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </Fab>
      <Dialog
        open={visible}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Please enter a name for a new chat
        </DialogTitle>
        <form onSubmit={onAddChat} className="chat__form">
          <TextField autoFocus value={name} onChange={changeName} />
          <FormControlLabel
            control={
              <Switch
                checked={valueChecked}
                onChange={handleChecked}
                name="checkedB"
                color="primary"
              />
            }
            label="Chat with robot"
          />
          <Button onClick={onAddChat} disabled={!name} color="primary">
            Submit
          </Button>
        </form>
      </Dialog>
    </>
  );
};
