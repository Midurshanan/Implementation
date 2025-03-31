
import './App.css';
import React, { useEffect, useState ,useRef} from "react";
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgicon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg'
import userIcon from './assets/user-icon.png'
import gptImg from './assets/chatgptLogo.svg'

function App() {
  const msgEnd = useRef(null);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(()=>{
    msgEnd.current.scrollIntoView();
  },[messages])
 
  const handleSend = async () => {

    setMessages([...messages, { sender: 'user', text: inputText },]);
    const response = await fetch("https://2bae-34-16-221-57.ngrok-free.app/generate_response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: inputText }),
    });
    const data = await response.json();
    console.log(data);
    console.log(data.response);
    setMessages([...messages, { sender: 'user', text: inputText }, { sender: 'bot', text: data.response }]);
    setInputText("");
  };

const handleQuery = async (e) =>{
  setMessages([...messages, { sender: 'user', text: e.target.value },]);
  const response = await fetch("https://2bae-34-16-221-57.ngrok-free.app/generate_response", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: e.target.value }),
  });
  const data = await response.json();
  setMessages([...messages, { sender: 'user', text: e.target.value }, { sender: 'bot', text: data.response }]);
  setInputText("");
  }

const handleEnter = (e) => {
  if (e.key === "Enter") {
    handleSend();
  }
};

  return (
    <div className="App">
      <div className="sidebar">
        <div className="upperside">
          
          <div className="upperSideTop">
            <div className="logo-brand-container">
              <img src={gptLogo} alt="Logo" className="logo" />
              <span className="brand">Chat Law</span>
            </div>
            <button className="midBtn" onClick={()=>{window.location.reload()}}><img src={addBtn} alt="new chat" className="addBtn" />New Chat</button>

            <div className="upperSideBottom">
              <button className="query" onClick={handleQuery} value={"What is law?"}><img src={msgicon} alt="Query" className="" />What is law?</button>
              <button className="query" onClick={handleQuery} value={"Current Law?"}><img src={msgicon} alt="Query" className="" />Current Law?</button>
            </div>
 
          
          </div>

        </div>

        <div className='lowerside'>
          <div className='listItems'><img src={home} alt="" className="listItemsImg" />Home</div>
          <div className='listItems'><img src={saved} alt="" className="listItemsImg" />Saved</div>
          <div className='listItems'><img src={rocket} alt="" className="listItemsImg" />Upgrade to pro</div>
        </div>
      </div>

      <div className='main'>
        <div className="chats">
            <div className="chat">
              <img className='chatImg' src={userIcon} alt="" /><p className="txt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div className="chat bot">
              <img className='chatImg' src={gptImg} alt="" /><p className="txt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            {messages.map((message, index) => (
            <div key={index} className={`chat ${message.sender === 'bot' ? 'bot' : ''}`}>
              <img className='chatImg' src={message.sender === 'bot' ? gptImg : userIcon} alt="" />
              <p className="txt">{message.text}</p>
            </div>
            ))}
            <div ref= {msgEnd}/>
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input 
              type="text"
              value={inputText}
              onKeyDown={handleEnter}
              onChange={(e) => setInputText(e.target.value)}
              placeholder='Send a message' 
            /> <button onClick={handleSend} className="send"><img src={sendBtn} alt="Send" /></button>
          </div>
          <p>ChatLAW may produce incorrect answers at your own risk</p>
        </div>
      </div>

    </div>
  );
}

export default App;
