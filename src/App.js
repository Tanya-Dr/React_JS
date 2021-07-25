import { Message } from './components/Message/Message';
import logo from './logo.svg';
import './App.css';

const msg = "from Tanya!";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello, React,
        </p>
        <Message text={msg}/>
      </header>
    </div>
  );
}

export default App;
