import "./Message.css";

export const Message = ({ author, text, profileName }) => {
  return (
    <div
      className={`message ${
        author !== profileName ? "message_anotherUser" : "message_user"
      }`}
    >
      <p className="message__author">{author}</p>
      <p className="message__text">{text}</p>
    </div>
  );
};
