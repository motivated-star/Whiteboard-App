import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import Canvas from "./Canvas"

const Room = ({ userNo, socket, setUsers, setUserNo }) => {
  const canvasRef = useRef(null)
  const ctx = useRef(null)
  const [color, setColor] = useState("#000000")
  const [elements, setElements] = useState([])
  const [history, setHistory] = useState([])
  const [tool, setTool] = useState("pencil")

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

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)
    setElements([])
  }

  const undo = () => {
    setHistory((prevHistory) => [...prevHistory, elements[elements.length - 1]])
    setElements((prevElements) => prevElements.filter((ele, index) => index !== elements.length - 1))
  }

  const redo = () => {
    setElements((prevElements) => [...prevElements, history[history.length - 1]])
    setHistory((prevHistory) => prevHistory.filter((ele, index) => index !== history.length - 1))
  }

  return (
    <div className="container-fluid main-container">
      <div className="row">
        <div className="col-md-12">
          <h1 className="display-5 pt-4 pb-3 text-center main-title">React Drawing App - users online: {userNo}</h1>
        </div>
      </div>
      <div className="row justify-content-center align-items-center text-center py-2">
        <div className="col-md-2">
          <div className="color-picker d-flex align-items-center justify-content-center">
            Color Picker : &nbsp;
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="color-input" />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-check form-check-inline custom-radio">
            <input
              className="form-check-input"
              type="radio"
              name="tools"
              id="pencil"
              value="pencil"
              checked={tool === "pencil"}
              onClick={(e) => setTool(e.target.value)}
              readOnly={true}
            />
            <label className="form-check-label" htmlFor="pencil">
              Pencil
            </label>
          </div>
          <div className="form-check form-check-inline custom-radio">
            <input
              className="form-check-input"
              type="radio"
              name="tools"
              id="line"
              value="line"
              checked={tool === "line"}
              onClick={(e) => setTool(e.target.value)}
              readOnly={true}
            />
            <label className="form-check-label" htmlFor="line">
              Line
            </label>
          </div>
          <div className="form-check form-check-inline custom-radio">
            <input
              className="form-check-input"
              type="radio"
              name="tools"
              id="rect"
              value="rect"
              checked={tool === "rect"}
              onClick={(e) => setTool(e.target.value)}
              readOnly={true}
            />
            <label className="form-check-label" htmlFor="rect">
              Rectangle
            </label>
          </div>
        </div>

        <div className="col-md-2">
          <button type="button" className="btn custom-btn" disabled={elements.length === 0} onClick={() => undo()}>
            Undo
          </button>
          &nbsp;&nbsp;
          <button type="button" className="btn custom-btn ml-1" disabled={history.length < 1} onClick={() => redo()}>
            Redo
          </button>
        </div>
        <div className="col-md-1">
          <div className="color-picker d-flex align-items-center justify-content-center">
            <button type="button" className="btn custom-btn" onClick={clearCanvas}>
              Clear
            </button>
          </div>
        </div>
      </div>
      <div className="row canvas-row">
        <div className="col-md-12">
          <div className="canvas-container">
            <Canvas
              canvasRef={canvasRef}
              ctx={ctx}
              color={color}
              setElements={setElements}
              elements={elements}
              tool={tool}
              socket={socket}
            />
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

        .color-picker {
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
        }

        .color-input {
          width: 40px;
          height: 30px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .color-input:hover {
          border-color: rgba(255, 255, 255, 0.6);
          transform: scale(1.05);
        }

        .custom-radio .form-check-input {
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .custom-radio .form-check-input:checked {
          background: linear-gradient(45deg, #9b59b6, #3498db);
          border-color: rgba(255, 255, 255, 0.6);
        }

        .custom-radio .form-check-label {
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .custom-radio .form-check-label:hover {
          color: #fff;
        }

        .custom-btn {
          background: transparent;
          color: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 8px;
          padding: 8px 16px;
          font-weight: 500;
          transition: all 0.3s ease;
          width: 80px;
          height: 40px;
          font-size: 0.9rem;
        }

        .custom-btn:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .custom-btn:active:not(:disabled) {
          transform: translateY(-1px) scale(1.02);
        }

        .custom-btn:disabled {
          color: rgba(255, 255, 255, 0.3);
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .custom-btn:disabled:hover {
          background: transparent;
          transform: none;
          box-shadow: none;
        }

        .canvas-row {
          padding: 20px;
        }

        .canvas-container {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 15px;
          padding: 20px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        @media (max-width: 768px) {
          .main-title {
            font-size: 1.5rem;
          }
          
          .custom-btn {
            font-size: 0.8rem;
            padding: 6px 12px;
            width: 70px;
            height: 35px;
          }
        }
      `}</style>
    </div>
  )
}

export default Room
