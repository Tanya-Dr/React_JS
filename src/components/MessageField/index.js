import { useCallback, useEffect, useRef } from "react";
import { Message } from "../Message";
import "./MessageField.css";

export const MessageField = ({ messageList, chatName }) => {
  const renderMessage = useCallback(
    (message) => (
      <Message key={message.id} author={message.author} text={message.text} />
    ),
    []
  );
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messageList]);

  return (
    <>
      <h2 className="messageList__header">{chatName}</h2>
      <div className="message__list">
        {messageList.map(renderMessage)}
        <div ref={messagesEndRef} />
      </div>
    </>
  );
};
