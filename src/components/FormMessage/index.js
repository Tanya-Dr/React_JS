import "./FormMessage.css";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Icon, Button, TextField } from "@material-ui/core";
import {
  addMessageWithReply,
  sendMessageWithFB,
} from "../../store/messages/actions";
import { useInput } from "../../utils/UseInput";

export const FormMessage = ({ chatId, profileName }) => {
  const { value, handleChange, reset } = useInput("");
  const inputRef = useRef(null);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value) {
      return;
    }

    const newMsg = {
      id: Date.now(),
      text: value,
      author: profileName,
    };

    // dispatch(addMessageWithReply(chatId, newMsg));
    dispatch(sendMessageWithFB(chatId, newMsg));
    reset();
    inputRef.current?.focus();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [chatId]);

  return (
    <form className="message__form" onSubmit={handleSubmit}>
      <TextField
        id="standard-multiline-flexible"
        multiline
        maxRows={4}
        fullWidth
        placeholder="Enter your message"
        value={value}
        onChange={handleChange}
        inputRef={inputRef}
        onKeyDown={(e) => {
          if (e.keyCode === 13) handleSubmit(e);
        }}
      />
      <Button
        variant="contained"
        color="primary"
        endIcon={<Icon>send</Icon>}
        type="submit"
      >
        Send
      </Button>
    </form>
  );
};
