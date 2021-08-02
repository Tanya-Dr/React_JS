import { useCallback } from 'react';
import { Message } from '../Message/Message';
import './MessageField.css';

export const MessageField = ({ messageList }) => {
    const renderMessage = useCallback((message) => 
        <Message key = {message.id} author = {message.author} text = {message.text}/>
    , []);

    return (
        <>
            <h2 className="messageList__header">Robot chat</h2>
            <div className="message__list">
                {messageList.map(renderMessage)}
            </div>
        </>
    );
}