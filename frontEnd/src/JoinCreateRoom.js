import { useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { toast } from "react-toastify"

const JoinCreateRoom = ({ uuid, setUser, setRoomJoined }) => {
  const [roomId, setRoomId] = useState(uuid())
  const [name, setName] = useState("")
  const [joinName, setJoinName] = useState("")
  const [joinRoomId, setJoinRoomId] = useState("")

  const handleCreateSubmit = (e) => {
    e.preventDefault()
    if (!name) return toast.dark("Please enter your name!")

    setUser({
      roomId,
      userId: uuid(),
      userName: name,
      host: true,
      presenter: true,
    })
    setRoomJoined(true)
  }
  const handleJoinSubmit = (e) => {
    e.preventDefault()
    if (!joinName) return toast.dark("Please enter your name!")

    setUser({
      roomId: joinRoomId,
      userId: uuid(),
      userName: joinName,
      host: false,
      presenter: false,
    })
    setRoomJoined(true)
  }

  return (
    <div className="container-fluid main-container">
      <div className="row header-row">
        <div className="col-md-12">
          <h1 className="text-center main-title">Realtime Whiteboard Sharing App</h1>
        </div>
      </div>
      <div className="row mx-3 form-row">
        <div className="col-md-5 p-4 mx-auto card-container create-card">
          <div className="card-decoration"></div>
          <h1 className="text-center card-title mb-4">Create Room</h1>
          <form onSubmit={handleCreateSubmit}>
            <div className="form-group my-2">
              <label className="input-label">Your Name</label>
              <div className="input-icon-wrapper">
                <i className="input-icon user-icon">👤</i>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="form-control custom-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group my-2">
              <label className="input-label">Room ID</label>
              <div className="input-group custom-input-group">
                <input type="text" className="form-control custom-input room-id-input" value={roomId} readOnly={true} />
                <div className="input-group-append">
                  <button className="btn custom-btn generate-btn" type="button" onClick={() => setRoomId(uuid())}>
                    Generate
                  </button>
                  <CopyToClipboard text={roomId} onCopy={() => toast.success("Room Id Copied To Clipboard!")}>
                    <button className="btn custom-btn copy-btn" type="button">
                      Copy
                    </button>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
            <div className="form-group mt-3">
              <button type="submit" className="form-control btn custom-submit-btn create-btn">
                <span>Create Room</span>
                <i className="btn-icon">🚀</i>
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-5 p-4 mx-auto card-container join-card">
          <div className="card-decoration"></div>
          <h1 className="text-center card-title mb-4">Join Room</h1>
          <form onSubmit={handleJoinSubmit}>
            <div className="form-group my-2">
              <label className="input-label">Your Name</label>
              <div className="input-icon-wrapper">
                <i className="input-icon user-icon">👤</i>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="form-control custom-input"
                  value={joinName}
                  onChange={(e) => setJoinName(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group my-2">
              <label className="input-label">Room ID</label>
              <div className="input-icon-wrapper">
                <i className="input-icon room-icon">🔑</i>
                <input
                  type="text"
                  className="form-control custom-input"
                  value={joinRoomId}
                  onChange={(e) => setJoinRoomId(e.target.value)}
                  placeholder="Enter Room ID"
                />
              </div>
            </div>
            <div className="form-group mt-3">
              <button type="submit" className="form-control btn custom-submit-btn join-btn">
                <span>Join Room</span>
                <i className="btn-icon">🔗</i>
              </button>
            </div>
          </form>
        </div>
      </div>
      <style jsx>{`
        .main-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          flex-direction: column;
          padding: 0;
        }

        .header-row {
          height: 15vh;
          display: flex;
          align-items: flex-end;
          margin-bottom: 4vh;
        }

        .form-row {
          flex: 1;
          display: flex;
          align-items: flex-start;
          margin-top: 2vh;
        }

        .main-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #fff;
          animation: slideInDown 0.8s ease-out;
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .card-container {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 15px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .card-container:hover {
          transform: translateY(-5px);
        }

        .create-card {
          background: linear-gradient(135deg, rgba(41, 128, 185, 0.2), rgba(142, 68, 173, 0.2));
        }

        .join-card {
          background: linear-gradient(135deg, rgba(39, 174, 96, 0.2), rgba(41, 128, 185, 0.2));
        }

        .card-decoration {
          position: absolute;
          top: 0;
          right: 0;
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
          clip-path: circle(50px at 100% 0%);
        }

        .card-title {
          color: #fff;
          font-weight: 600;
          font-size: 1.5rem;
        }

        .input-label {
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
          margin-bottom: 5px;
          font-size: 0.85rem;
        }

        .input-icon-wrapper {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 2;
        }

        .custom-input {
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #ffffff !important;
          border-radius: 8px;
          padding: 10px 15px 10px 40px;
          transition: all 0.3s ease;
          font-weight: 500;
          width: 100%;
          display: block;
        }

        .custom-input:focus {
          background: rgba(255, 255, 255, 0.25) !important;
          border-color: rgba(255, 255, 255, 0.6);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
          color: #ffffff !important;
        }

        .custom-input::placeholder {
          color: rgba(255, 255, 255, 0.7) !important;
          font-weight: 400;
        }

        .room-id-input {
          border-radius: 8px 0 0 8px !important;
          padding-left: 12px;
          color: #ffffff !important;
          font-weight: 500;
          min-height: 42px;
        }

        .custom-input-group {
          display: flex;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.1);
        }

        .custom-input-group .form-control {
          border: none;
          background: transparent;
          color: #ffffff !important;
        }

        .input-group-append {
          display: flex;
        }

        .custom-btn {
          padding: 10px 12px;
          color: #fff;
          border: none;
          transition: all 0.3s ease;
          font-weight: 500;
          font-size: 0.85rem;
          min-height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .generate-btn {
          background: rgba(52, 152, 219, 0.7);
        }

        .generate-btn:hover {
          background: rgba(52, 152, 219, 1);
        }

        .copy-btn {
          background: rgba(155, 89, 182, 0.7);
        }

        .copy-btn:hover {
          background: rgba(155, 89, 182, 1);
        }

        .custom-submit-btn {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          padding: 10px;
          font-weight: 600;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .create-btn {
          background: linear-gradient(45deg, #9b59b6, #3498db);
        }

        .create-btn:hover {
          background: linear-gradient(45deg, #8e44ad, #2980b9);
          transform: translateY(-2px);
        }

        .join-btn {
          background: linear-gradient(45deg, #2ecc71, #3498db);
        }

        .join-btn:hover {
          background: linear-gradient(45deg, #27ae60, #2980b9);
          transform: translateY(-2px);
        }

        .btn-icon {
          transition: transform 0.3s ease;
        }

        .custom-submit-btn:hover .btn-icon {
          transform: translateX(3px);
        }

        @media (max-width: 768px) {
          .main-container {
            min-height: 100vh;
            height: auto;
            padding: 20px 0;
            overflow-y: auto;
          }
          
          .header-row {
            height: auto;
            margin-bottom: 20px;
          }
          
          .form-row {
            flex-direction: column;
            margin-top: 0;
          }
          
          .main-title {
            font-size: 1.8rem;
            margin: 20px 0;
          }
          
          .card-container {
            margin-bottom: 20px;
            width: 90%;
          }
          
          .custom-input-group {
            flex-direction: column;
            border-radius: 8px;
            overflow: visible;
          }
          
          .room-id-input {
            border-radius: 8px !important;
            margin-bottom: 10px;
            width: 100% !important;
            display: block !important;
          }
          
          .input-group-append {
            display: flex;
            width: 100%;
            gap: 10px;
          }
          
          .custom-btn {
            flex: 1;
            border-radius: 8px;
            margin: 0;
          }
        }
        
        /* Fix for specific problematic dimensions */
        @media (min-width: 767px) and (max-width: 769px) {
          .custom-input-group {
            display: flex;
            flex-direction: column;
          }
          
          .room-id-input {
            width: 100% !important;
            display: block !important;
            margin-bottom: 10px;
            border-radius: 8px !important;
          }
          
          .input-group-append {
            width: 100%;
            display: flex;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  )
}

export default JoinCreateRoom
