import { useEffect, useRef } from "react"
import { toast } from "react-toastify"

const ClientRoom = ({ userNo, socket, setUsers, setUserNo }) => {
  const imgRef = useRef(null)

  useEffect(() => {
    socket.on("message", (data) => {
      toast.info(data.message)
    })
  }, [])

  useEffect(() => {
    socket.on("users", (data) => {
      setUsers(data)
      setUserNo(data.length)
    })
  }, [])

  useEffect(() => {
    socket.on("canvasImage", (data) => {
      imgRef.current.src = data
    })
  }, [])

  return (
    <div className="container-fluid main-container">
      <div className="row pb-2">
        <div className="col-md-12">
          <h1 className="display-5 pt-4 pb-3 text-center main-title">React Drawing App - users online: {userNo}</h1>
        </div>
      </div>
      <div className="row mt-5 canvas-row">
        <div className="col-md-8 mx-auto">
          <div className="canvas-viewer-container">
            <div className="viewer-header">
              <span className="viewer-label">📺 Live Canvas View</span>
              <span className="viewer-status">🟢 Connected</span>
            </div>
            <div className="image-container">
              <img className="canvas-image" ref={imgRef} src="/placeholder.svg" alt="Live canvas view" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .main-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 0;
        }

        .main-title {
          color: #fff;
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .canvas-row {
          padding: 20px;
        }

        .canvas-viewer-container {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(15px);
          border-radius: 20px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .canvas-viewer-container:hover {
          transform: translateY(-5px);
        }

        .viewer-header {
          background: rgba(118, 75, 162, 0.3);
          padding: 15px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid rgba(255, 255, 255, 0.2);
        }

        .viewer-label {
          color: #fff;
          font-weight: 600;
          font-size: 1rem;
        }

        .viewer-status {
          color: #fff;
          font-weight: 500;
          font-size: 0.9rem;
          background: rgba(46, 204, 113, 0.2);
          padding: 5px 12px;
          border-radius: 15px;
          border: 1px solid rgba(46, 204, 113, 0.3);
        }

        .image-container {
          height: 500px;
          background: rgba(255, 255, 255, 0.95);
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .canvas-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 10px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .canvas-image:hover {
          transform: scale(1.02);
        }

        @media (max-width: 768px) {
          .main-title {
            font-size: 1.5rem;
          }
          
          .canvas-viewer-container {
            margin: 0 10px;
          }
          
          .image-container {
            height: 350px;
            padding: 15px;
          }
          
          .viewer-header {
            padding: 12px 15px;
          }
          
          .viewer-label {
            font-size: 0.9rem;
          }
          
          .viewer-status {
            font-size: 0.8rem;
            padding: 4px 8px;
          }
        }
      `}</style>
    </div>
  )
}

export default ClientRoom
