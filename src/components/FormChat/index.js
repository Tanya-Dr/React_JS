import "./FormChat.css";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { Button, Dialog, DialogTitle, Fab, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { useInput } from "../../utils/UseInput";
import { addChatWithFB } from "../../store/chats/actions";

export const FormChat = () => {
  const [visible, setVisible] = useState(false);
  const { value, handleChange, reset } = useInput("");

  const dispatch = useDispatch();

  const handleClose = () => setVisible(false);
  const handleOpen = () => setVisible(true);

  const onAddChat = (e) => {
    e.preventDefault();

    if (!value) {
      return;
    }

    const newIdChat = `chat${Date.now()}`;
    dispatch(addChatWithFB(newIdChat, value));
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
          <TextField autoFocus value={value} onChange={handleChange} />
          <Button onClick={onAddChat} disabled={!value} color="primary">
            Submit
          </Button>
        </form>
      </Dialog>
    </>
  );
};
