import React from "react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  ListItemSecondaryAction,
  IconButton,
  Fab,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import "./ChatField.css";

export const ChatField = ({
  chatList,
  onDeleteChat,
  onAddChat,
  idSelected,
}) => {
  const handleDeleteChat = (event, id) => {
    onDeleteChat(id);
  };

  const handleAddChat = (event) => {
    onAddChat();
  };
  const chatsEndRef = useRef(null);
  const scrollToBottom = () => {
    chatsEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chatList]);

  return (
    <div className="chat__list">
      <div className="chat__top">
        <h2 className="chat__header">Chats</h2>
        <Fab
          size="small"
          color="primary"
          aria-label="add"
          onClick={handleAddChat}
        >
          <AddIcon />
        </Fab>
      </div>
      <List disablePadding={true}>
        {Object.values(chatList).map((chat) => (
          <ListItem
            alignItems="flex-start"
            button
            divider={true}
            selected={idSelected === chat.id}
            key={chat.id}
          >
            <Link to={`/chats/${chat.id}`} className="chat__link" key={chat.id}>
              <ListItemText
                primary={chat.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      {chat.messages.length
                        ? `${chat.messages[chat.messages.length - 1].author} `
                        : ""}
                    </Typography>
                    {chat.messages.length
                      ? chat.messages[chat.messages.length - 1].text
                      : ""}
                  </React.Fragment>
                }
              />
            </Link>
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={(event) => handleDeleteChat(event, chat.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        <div ref={chatsEndRef} />
      </List>
    </div>
  );
};
