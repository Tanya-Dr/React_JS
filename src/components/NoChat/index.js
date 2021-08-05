import { Link } from "react-router-dom";
import "./NoChat.css";

export const NoChat = () => {
  return (
    <div className="App">
      <div className="App_openedChat home">
        <h2 className="openedChat__header nochat">
          There is wrong chat, please select chat from
          <Link to="../chats" className="nochat__link">
            here
          </Link>
        </h2>
      </div>
    </div>
  );
};
