import { useCallback, useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { getNameChatById } from "../../store/chats/selectors";
import { getMsgListById } from "../../store/messages/selectors";
import { Message } from "../Message";
import "./MessageList.css";

export const MessageList = ({ chatId }) => {
  const getSelectedMsgList = useMemo(() => getMsgListById(chatId), [chatId]);
  const messageList = useSelector(getSelectedMsgList);

  const getSelectedChatName = useMemo(() => getNameChatById(chatId), [chatId]);
  const chatName = useSelector(getSelectedChatName);

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
      <h2 className="App_openedChat__header messageList__header">{chatName}</h2>
      <div className="message__list">
        {!!messageList && messageList.map(renderMessage)}
        <div ref={messagesEndRef} />
      </div>
    </>
  );
};
