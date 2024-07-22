import React, { useEffect, useState } from 'react'
import HomePage from './Page/HomePage'
import RoomPage from './Page/RoomPage'
import {Routes, Route} from 'react-router-dom'
import io from 'socket.io-client'


const server = "https://localhost:5000";
const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};

const socket = io(server, connectionOptions);

const App = () => {

  const [user , setUser] = useState(null);

  useEffect(() => {
    socket.on("userIsJoined", (data) => {
      if(data.success){
        console.log("user joined")
      }else{
        console.log("wrong joined")
      }
    });
  },[]);

  const uuid = () => {
    let S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  };


  return (
      <Routes>
        <Route path='/' element={<HomePage uuid ={uuid} socket={socket}  setUser={setUser}/>}  />
        <Route path='/:roomId' element={<RoomPage user={user}/>}  />
      </Routes>
  )
}

export default App
