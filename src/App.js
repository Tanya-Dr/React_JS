import { useState, useCallback, useEffect } from 'react';
import { InputMessage } from './components/InputMessage/InputMessage';
import { MessageField } from './components/MessageField/MessageField';
import { ChatField } from './components/ChatField/ChatField';
import './App.css';

function App() {
  const [messageList, setMessageList] = useState([]);
  const [chatList, setChatList] = useState([
    {
      name: 'Brunch this weekend?',
      id: Date.now(),
      lastName: 'Ali Connors',
      lastMsg: `— I'll be in your neighborhood doing errands this…`,
    },
    {
      name: 'Summer BBQ',
      id: Date.now()+1,
      lastName: 'to Scott, Alex, Jennifer',
      lastMsg: ` — Wish I could come, but I'm out of town this…`,
    },
    {
      name: 'Oui Oui',
      id: Date.now()+2,
      lastName: 'Sandra Adams',
      lastMsg: `— Do you have Paris recommendations? Have you ever…`,
    },
  ]);

  useEffect(() =>{
    if (messageList.length && messageList[messageList.length - 1].author !== 'Robot') {
      const timer = setTimeout(() => {
        const robotMess = {
          author: 'Robot', 
          text: 'Hello, can I help you?', 
          id: Date.now()
        };
        setMessageList([...messageList, robotMess]);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [messageList]);

  const sendMessage = useCallback((textMessage) => {
    if (textMessage.length !== 0) {
      const newMessage = {
        author: "Me", 
        text: `${textMessage}`, 
        id: Date.now()
      };
      setMessageList([...messageList, newMessage]);
    }    
  }, [messageList]);
  
  return (
    <div className="App">
      <ChatField chatList={chatList}/>
      <div className="OpenedChat">        
        <MessageField messageList={messageList} />
        <InputMessage onSendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default App;
