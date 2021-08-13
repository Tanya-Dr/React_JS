import "./FormMessage.css";
import { useEffect, useRef, useState } from "react";
import { Icon, Button, TextField } from "@material-ui/core";
import { AUTHORS } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../store/messages/actions";
import { selectName } from "../../store/profile/selector";

export const FormMessage = ({ chatId }) => {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const dispatch = useDispatch();
  const name = useSelector(selectName);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value) {
      return;
    }

    const newMsg = {
      id: Date.now(),
      text: value,
      author: name.length === 0 ? AUTHORS.human : name,
    };
    dispatch(addMessage(chatId, newMsg));
    setValue("");
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
