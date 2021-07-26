import { useState, useCallback, useEffect } from 'react';
import { Message } from './components/Message/Message';
import { InputMessage } from './components/InputMessage/InputMessage';
import './App.css';

function App() {
  const [messageList, setMessageList] = useState([]);

  useEffect(() =>{
    const timer = setTimeout(() => {
      if (messageList.length && messageList[messageList.length - 1].author !== 'Robot') {
        const robotMess = {author: 'Robot', text: 'Hello, can I help you?'};
        setMessageList([...messageList, robotMess]);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [messageList])

  const sendMessage = useCallback((textMessage) => {
    if (textMessage.length !== 0) {
      const newMessage = {author: "Me", text: `${textMessage}`};

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
          <InputMessage onClick={sendMessage}/>
        </div>
      </div>
    </div>
  );
}

export default App;
