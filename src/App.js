import './App.css';
import { useState,useEffect } from 'react';
import io from 'socket.io-client';
import {nanoid} from 'nanoid';

//const socket = io.connect("http://localhost:5000");
const socket = io.connect("https://socker-io-server.onrender.com/");
const username = nanoid(3);

function App() {
  const [message,setMessage] = useState("");
  const [chat,setChat] = useState([]);
  
  function sendChat(e){
    e.preventDefault();
    if(message==="") return ;
    socket.emit("chat",{message,username});
    setMessage("");
  }
  
  useEffect(()=>{
    socket.on("chat",(payload)=>{
      setChat([...chat,payload]);
    })
  })

  return (
    <div className="App">
      <header className="App-header">
         <h1>ChatChut</h1>
          <div className="Main">
             {chat.map((payload,index)=>{
                  return <p key={index}>{payload.message} : <span>{username}</span></p>
             })}
          </div>
          <form onSubmit={sendChat} className="Form">
              <input 
               type="text" 
               value={message} 
               placeholder="Type a message..."
               onChange={(e)=>{
                  setMessage(e.target.value)
              }} 
              className='Form-input' 
              />

              <button type="submit" className="button"  >Send</button>
          </form>
      </header>
    </div>
  );
}

export default App;
