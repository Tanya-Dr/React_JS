import { useState, useCallback, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { InputMessage } from "../InputMessage";
import { MessageField } from "../MessageField";
import { ChatField } from "../ChatField";
import { AUTHORS } from "../../constants";
import "./Chats.css";
import { usePrev } from "../../utils/UsePrev";

const initialChats = {
  chat1: {
    messages: [{ text: "Hello world!", author: AUTHORS.human, id: "chat1-1" }],
    name: "Chat 1",
    id: "chat1",
  },
  chat2: {
    messages: [{ text: "This is chat2", author: AUTHORS.human, id: "chat2-1" }],
    name: "Chat 2",
    id: "chat2",
  },
  chat3: {
    messages: [],
    name: "Chat 3",
    id: "chat3",
  },
};

function Chats() {
  const [chatList, setChatList] = useState(initialChats);
  const { chatId } = useParams();

  const prevChatList = usePrev(chatList);

  const sendMessage = useCallback(
    (newMessage) => {
      if (newMessage.text.length !== 0) {
        setChatList({
          ...chatList,
          [chatId]: {
            ...chatList[chatId],
            messages: [...chatList[chatId].messages, newMessage],
          },
        });
      }
    },
    [chatList, chatId]
  );

  const deleteChat = useCallback(
    (chat) => {
      const newChatList = { ...chatList };
      delete newChatList[chat];
      setChatList({ ...newChatList });
    },
    [chatList]
  );

  const addChat = useCallback(() => {
    const newIdChat = Date.now();
    setChatList({
      ...chatList,
      [`chat${newIdChat}`]: {
        messages: [],
        name: `Chat ${newIdChat}`,
        id: `chat${newIdChat}`,
      },
    });
  }, [chatList]);

  useEffect(() => {
    if (
      !!chatId &&
      !!chatList[chatId]?.messages.length &&
      chatList[chatId].messages[chatList[chatId].messages.length - 1].author !==
        AUTHORS.robot
    ) {
      const timer = setTimeout(() => {
        const newMessage = {
          text: "Hello, can I help you?",
          author: AUTHORS.robot,
          id: Date.now(),
        };
        sendMessage(newMessage);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [chatList, chatId, sendMessage]);

  if (!!prevChatList && !!prevChatList[chatId] && !chatList[chatId]) {
    return <Redirect to="/chats" />;
  } else if (!!chatId && !chatList[chatId]) {
    return <Redirect to="/nochat" />;
  }

  return (
    <div className="App">
      <ChatField
        chatList={chatList}
        onDeleteChat={deleteChat}
        onAddChat={addChat}
        idSelected={!!chatId ? chatId : ""}
      />
      <div className="App_openedChat">
        {!!chatId ? (
          <>
            <MessageField
              messageList={chatList[chatId].messages}
              chatName={chatList[chatId].name}
            />
            <InputMessage onSendMessage={sendMessage} chatId={chatId} />
          </>
        ) : (
          <h2 className="openedChat__header">
            Select a chat to start messaging or add a new one
          </h2>
        )}
      </div>
    </div>
  );
}

export default Chats;
