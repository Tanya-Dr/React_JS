import "./FormMessage.css";
import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon, Button, TextField } from "@material-ui/core";
import {
  addMessageWithReply,
  sendMessageWithFB,
} from "../../store/messages/actions";
import { useInput } from "../../utils/UseInput";
import { getRobotFlag } from "../../store/chats/selectors";

export const FormMessage = ({ chatId, profileName }) => {
  const { value, handleChange, reset } = useInput("");
  const inputRef = useRef(null);

  const dispatch = useDispatch();

  const getSelectedChatRobotFlag = useMemo(
    () => getRobotFlag(chatId),
    [chatId]
  );
  const selectedChatRobotFlag = useSelector(getSelectedChatRobotFlag);

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

    if (selectedChatRobotFlag) {
      dispatch(addMessageWithReply(chatId, newMsg));
    } else {
      dispatch(sendMessageWithFB(chatId, newMsg));
    }

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
