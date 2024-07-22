import React from 'react'
import { CardOne } from '../components/CardOne'
const HomePage = ({uuid , setUser , socket}) => {
  return (
    <>
      <h1 className="text-center text-4xl font-extrabold text-gray-800 leading-tight mt-7">Realtime Whiteboard Sharing App</h1>
      <div className="flex flex-row flex-wrap justify-around">
        <CardOne content="Create Your Room" placeHolder="Generate Your Code" command="Generate" uuid={uuid} socket={socket} setUser={setUser}/>
        <CardOne content="Join Room" placeHolder="Enter the Code" command="Enter" uuid={uuid} socket={socket} setUser={setUser}/>
      </div>
    </>
  )
}

export default HomePage
