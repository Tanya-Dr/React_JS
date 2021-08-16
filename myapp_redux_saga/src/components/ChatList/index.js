import "./ChatList.css";
import React, { useCallback } from "react";
import { List } from "@material-ui/core";
import { FormChat } from "../FormChat";
import { ChatItem } from "../ChatItem";
import { AUTHORS } from "../../constants";

export const ChatList = ({
  idSelected,
  chatList,
  msgList,
  profileName,
  onDeleteChat,
}) => {
  const renderChats = useCallback(
    (chat) => (
      <ChatItem
        key={chat.id}
        idSelected={idSelected}
        id={chat.id}
        name={chat.name}
        lastAuthor={
          !!msgList[chat.id] && msgList[chat.id].length
            ? msgList[chat.id][msgList[chat.id].length - 1].author ===
              AUTHORS.human
              ? profileName
              : msgList[chat.id][msgList[chat.id].length - 1].author
            : ""
        }
        lastText={
          !!msgList[chat.id] && msgList[chat.id].length
            ? msgList[chat.id][msgList[chat.id].length - 1].text
            : ""
        }
        onDeleteChat={onDeleteChat}
      />
    ),
    [idSelected, onDeleteChat, msgList, profileName]
  );

  return (
    <div className="chat__list">
      <div className="chat__top">
        <h2 className="chat__header">Chats</h2>
        <FormChat />
      </div>
      <List disablePadding={true}>
        {Object.values(chatList).map(renderChats)}
      </List>
    </div>
  );
};
