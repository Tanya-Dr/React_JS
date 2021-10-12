import "./MessageList.css";
import { useCallback, useEffect, useRef } from "react";
import { Message } from "../Message";

export const MessageList = ({ messageList, chatName, profileName }) => {
  const renderMessage = useCallback(
    (message) => (
      <Message
        key={message.id}
        author={message.author}
        text={message.text}
        profileName={profileName}
      />
    ),
    [profileName]
  );

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messageList]);

  return (
    <>
      <h2 className="App_openedChat__header messageList__header">{chatName}</h2>
      <div className="message__list">
        {!!messageList && messageList.map(renderMessage)}
        <div ref={messagesEndRef} />
      </div>
    </>
  );
};
