import "./Chats.css";
import { useCallback, useMemo } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FormMessage } from "../FormMessage";
import { MessageList } from "../MessageList";
import { ChatList } from "../ChatList";
import { usePrev } from "../../utils/UsePrev";

import { getNameChatById, selectChatList } from "../../store/chats/selectors";
import { getMsgListById, selectMsgList } from "../../store/messages/selectors";
import { selectName } from "../../store/profile/selector";
import { deleteChat } from "../../store/chats/actions";
import { deleteChatFromMsgList } from "../../store/messages/actions";

function Chats() {
  const { chatId } = useParams();

  const chatList = useSelector(selectChatList);
  const getSelectedChatName = useMemo(() => getNameChatById(chatId), [chatId]);
  const selectedChatName = useSelector(getSelectedChatName);

  const messageList = useSelector(selectMsgList);
  const getSelectedMsgList = useMemo(() => getMsgListById(chatId), [chatId]);
  const selectedMsgList = useSelector(getSelectedMsgList);

  const name = useSelector(selectName);

  const dispatch = useDispatch();

  const handleDeleteChat = useCallback(
    (id) => {
      dispatch(deleteChat(id));
      dispatch(deleteChatFromMsgList(id));
    },
    [dispatch]
  );

  const prevChatList = usePrev(chatList);

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
      <ChatList
        idSelected={!!chatId ? chatId : ""}
        chatList={chatList}
        msgList={messageList}
        profileName={name}
        onDeleteChat={handleDeleteChat}
      />
      <div className="App_openedChat">
        {!!chatId ? (
          <>
            <MessageList
              messageList={selectedMsgList}
              chatName={selectedChatName}
              profileName={name}
            />
            <FormMessage chatId={chatId} profileName={name} />
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
