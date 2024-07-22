import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function CardOne({content , placeHolder , command ,uuid , socket , setUser}) {
  const [roomId,setRoomId]=useState(uuid);
  const [name , setName]= useState("");
  const [customRoomId, setCustomRoomId] = useState("");
  const navigate = useNavigate();
  
  const handleCreateRoom = (e) => {
      e.preventDefault();
      const roomData = {
        name,
        roomId,
        userId: uuid,
        host: true,
        presenter: true
      };
      setUser(roomData);
      navigate(`/${roomId}`); // Correctly interpolate the roomId
      socket.emit("userJoined", roomData);
  }

  return (
    <section className="rounded-md bg-white p-1 my-10 border border-black">
      <div className="flex items-center justify-center bg-white mx-8 px-6 py-10 sm:px-4 sm:py-16 lg:px-6 lg:py-10">
      <div className="xl:mx-auto xl:w-full xl:max-w-lg 2xl:max-w-xl">
        <h2 className="text-2xl font-bold leading-tight text-black">{content}</h2>
        <form action="#" method="POST" className="mt-8 ">
            <div className="space-y-5 ">
              <div>
                <label htmlFor="" className="text-base font-medium text-gray-900">
                  {' '}
                  Name{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="name"
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="text-base font-medium text-gray-900"
                  >
                    {' '}
                    Code{' '}
                  </label>
                  <a href="#" title="" className="text-sm font-semibold text-black hover:underline">
                    {' '}
                    Copy Code{' '}
                  </a>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder={placeHolder}
                    value={command === 'Generate' ? roomId:customRoomId}
                    onChange={(e)=> setCustomRoomId(e.target.value)}
                    disabled={command === 'Generate'}
                  ></input>
                </div>
              </div>
              <div >
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  onClick={() => {setRoomId(uuid)}}
                >
                  {command} Room Code<ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
          <div className="mt-3 space-y-3">
            <button
              type="submit"
              className="relative inline-flex w-[300px] items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              onClick={handleCreateRoom}
            >
              {command} Room
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
