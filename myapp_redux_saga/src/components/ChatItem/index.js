import "./ChatItem.css";
import React from "react";
import { Link } from "react-router-dom";
import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

export const ChatItem = ({
  idSelected,
  id,
  name,
  lastAuthor = "",
  lastText = "",
  onDeleteChat,
}) => {
  const handleDelete = () => {
    onDeleteChat(id);
  };
  return (
    <ListItem
      alignItems="flex-start"
      button
      divider={true}
      selected={idSelected === id}
    >
      <Link to={`/chats/${id}`} className="chat__link" key={id}>
        <ListItemText
          primary={name}
          secondary={
            <React.Fragment>
              <Typography component="span" variant="body2" color="textPrimary">
                {`${lastAuthor}  `}
              </Typography>
              {lastText}
            </React.Fragment>
          }
        />
      </Link>
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
