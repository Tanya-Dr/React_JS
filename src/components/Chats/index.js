import "./Chats.css";
import { Redirect, useParams } from "react-router-dom";
import { FormMessage } from "../FormMessage";
import { MessageList } from "../MessageList";
import { ChatList } from "../ChatList";
import { usePrev } from "../../utils/UsePrev";
import { useDispatch, useSelector } from "react-redux";
import { AUTHORS } from "../../constants";
import { useEffect, useMemo } from "react";
import { addMessage } from "../../store/messages/actions";
import { selectChatList } from "../../store/chats/selectors";
import { getMsgListById } from "../../store/messages/selectors";

function Chats() {
  const { chatId } = useParams();

  const chatList = useSelector(selectChatList);
  const getSelectedMsgList = useMemo(() => getMsgListById(chatId), [chatId]);
  const selectedMsgList = useSelector(getSelectedMsgList);
  const dispatch = useDispatch();

  const prevChatList = usePrev(chatList);

  useEffect(() => {
    if (
      !!chatId &&
      !!selectedMsgList?.length &&
      selectedMsgList[selectedMsgList.length - 1].author !== AUTHORS.robot
    ) {
      const timer = setTimeout(() => {
        const newMessage = {
          id: Date.now(),
          text: "Hello, can I help you?",
          author: AUTHORS.robot,
        };
        dispatch(addMessage(chatId, newMessage));
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [chatList, chatId, selectedMsgList, dispatch]);

  if (
    !!prevChatList &&
    !!prevChatList.find((chat) => chat.id === chatId) &&
    !chatList.find((chat) => chat.id === chatId)
  ) {
    return <Redirect to="/chats" />;
  } else if (!!chatId && !chatList.find((chat) => chat.id === chatId)) {
    return <Redirect to="/nochat" />;
  }

  if (!!prevChatList && prevChatList.length < chatList.length) {
    const newChatId = chatList[chatList.length - 1].id;
    return <Redirect to={`/chats/${newChatId}`} />;
  }

  return (
    <div className="App">
      <ChatList idSelected={!!chatId ? chatId : ""} />
      <div className="App_openedChat">
        {!!chatId ? (
          <>
            <MessageList chatId={chatId} />
            <FormMessage chatId={chatId} />
          </>
        ) : (
          <h2 className="App_openedChat__header">
            Select a chat to start messaging or add a new one
          </h2>
        )}
      </div>
    </div>
  );
}

export default Chats;
