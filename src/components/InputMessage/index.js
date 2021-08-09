import { useEffect, useRef, useState } from "react";
import { Icon, Button, TextField } from "@material-ui/core";
import { AUTHORS } from "../../constants";
import "./InputMessage.css";

export const InputMessage = ({ onSendMessage, chatId }) => {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage({
      author: AUTHORS.human,
      id: Date.now(),
      text: value,
    });
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
