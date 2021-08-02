import './Message.css';

export const Message = ({author, text}) => {
    return ( 
        <div className = {`message ${author === 'Robot' ? 'message_robot' : 'message_user'}`}>
            <p className = 'message__author'>{author}</p>
            <p className = 'message__text'>{text}</p>
        </div>
    );
};