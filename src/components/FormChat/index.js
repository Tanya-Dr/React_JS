import "./FormChat.css";
import { Button, Dialog, DialogTitle, Fab, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addChat } from "../../store/chats/actions";
import { addChatToMsgList } from "../../store/messages/actions";

export const FormChat = () => {
  const [visible, setVisible] = useState(false);
  const [newChatName, setNewChatName] = useState("");

  const dispatch = useDispatch();

  const handleClose = () => setVisible(false);
  const handleOpen = () => setVisible(true);
  const handleChange = (e) => setNewChatName(e.target.value);

  const onAddChat = (e) => {
    e.preventDefault();

    if (!newChatName) {
      return;
    }

    const newIdChat = `chat${Date.now()}`;
    dispatch(addChat(newIdChat, newChatName));
    dispatch(addChatToMsgList(newIdChat));
    setNewChatName("");
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
          <TextField autoFocus value={newChatName} onChange={handleChange} />
          <Button onClick={onAddChat} disabled={!newChatName} color="primary">
            Submit
          </Button>
        </form>
      </Dialog>
    </>
  );
};
