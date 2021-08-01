import React from "react";
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import './ChatField.css';

export const ChatField = ({ chatList }) => {
    return (
    <div className="chat__list">
        <h2 className="chat__header">Chats</h2>
        <List disablePadding={true}>
            {chatList.map((chat) => 
                <ListItem alignItems="flex-start" key = {chat.id}>
                    <ListItemText
                        primary={chat.name}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="textPrimary"
                                >
                                    {chat.lastName}    
                                </Typography>
                                    {chat.lastMsg}
                            </React.Fragment>
                        }
                    />
                </ListItem>
            )}
        </List>
    </div>
  );
}