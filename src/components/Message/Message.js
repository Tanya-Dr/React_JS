import './Message.css';
export const Message = (props) => {
    return ( 
        <div className="message__list">
        {props.list.map((message) => 
            <div key = {message.id} className = {`message ${message.author === 'Robot' ? 'message_robot' : 'message_user'}`}>
                <p className = 'message__author'>{message.author}</p>
                <p className = 'message__text'>{message.text}</p>
            </div>
        )}
        </div>
    );
};