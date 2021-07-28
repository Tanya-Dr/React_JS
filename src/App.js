import { useState, useCallback, useEffect } from 'react';
import { Message } from './components/Message/Message';
import { InputMessage } from './components/InputMessage/InputMessage';
import './App.css';

function App() {
  const [messageList, setMessageList] = useState([]);

  useEffect(() =>{
    if (messageList.length && messageList[messageList.length - 1].author !== 'Robot') {
      const timer = setTimeout(() => {
        const robotMess = {author: 'Robot', text: 'Hello, can I help you?', id: Date.now()};
        setMessageList([...messageList, robotMess]);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [messageList]);

  const sendMessage = useCallback((textMessage) => {
    if (textMessage.length !== 0) {
      const newMessage = {author: "Me", text: `${textMessage}`, id: Date.now()};

      setMessageList([...messageList, newMessage]);
    }    
  }, [messageList]);
  
  return (
    <div className="App">
      <div className="wrapper">
        <header className="App-header">
          <p>
            Hello, welcome to the Chat!
          </p>  
        </header>
        <div className="App-chat">
          <Message list={messageList}/>
          <InputMessage onSendMessage={sendMessage}/>
        </div>
      </div>
    </div>
  );
}

export default App;
