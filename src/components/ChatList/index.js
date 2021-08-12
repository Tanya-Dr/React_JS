import "./ChatList.css";
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
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteChat } from "../../store/chats/actions";
import { selectChatList } from "../../store/chats/selectors";
import { selectMsgList } from "../../store/messages/selectors";
import { FormChat } from "../FormChat";
import { deleteChatFromMsgList } from "../../store/messages/actions";

export const ChatList = ({ idSelected }) => {
  const chatList = useSelector(selectChatList);
  const messageList = useSelector(selectMsgList);
  const dispatch = useDispatch();

  const handleDeleteChat = (event, id) => {
    dispatch(deleteChat(id));
    dispatch(deleteChatFromMsgList(id));
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
        <FormChat />
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
                      {!!messageList[chat.id] && messageList[chat.id].length
                        ? `${
                            messageList[chat.id][
                              messageList[chat.id].length - 1
                            ].author
                          } `
                        : ""}
                    </Typography>
                    {!!messageList[chat.id] && messageList[chat.id].length
                      ? `${
                          messageList[chat.id][messageList[chat.id].length - 1]
                            .text
                        } `
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
