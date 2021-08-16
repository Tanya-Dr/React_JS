import "./Message.css";
import { AUTHORS } from "../../constants";

export const Message = ({ author, text }) => {
  return (
    <div
      className={`message ${
        author === AUTHORS.robot ? "message_robot" : "message_user"
      }`}
    >
      <p className="message__author">{author}</p>
      <p className="message__text">{text}</p>
    </div>
  );
};
