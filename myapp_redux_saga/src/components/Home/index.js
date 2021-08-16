import "./Home.css";
import { Link } from "react-router-dom";

export const Home = ({ id, txt }) => {
  return (
    <div className="App">
      <div className="App_openedChat home">
        {id === "home" || id === "pageNotFound" ? (
          <h2 className="App_openedChat__header">{txt}</h2>
        ) : (
          <h2 className="App_openedChat__header nochat__header">
            {txt}
            <Link to="../chats" className="nochat__link">
              here
            </Link>
          </h2>
        )}
      </div>
    </div>
  );
};
