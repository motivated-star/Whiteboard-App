import React from 'react'
import { useState , useRef , useEffect} from 'react'
import Whiteboard from '../components/Whiteboard'

const RoomPage = ({user}) => {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    const [color , setColor] = useState("#000000");
    const [tool , setTool] = useState("pencil");
    const [ elements , setElements]=useState([]);
    const [history , setHistory] = useState([]);
    const handleClearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        setElements([]);
    };

    const handleUndo = () => {
        setHistory((prevHistory) => [
            ...prevHistory,
            elements[elements.length - 1],
          ]);
          setElements((prevElements) =>
            prevElements.filter((ele, index) => index !== elements.length - 1)
          );
    };

    const handleRedo = () => {
        setElements((prevElements) => [
          ...prevElements,
          history[history.length - 1],
        ]);
        setHistory((prevHistory) =>
          prevHistory.filter((ele, index) => index !== history.length - 1)
        );
      };

  return (
    <div className="container mx-auto">
    <div className="flex flex-col items-center">
        <h1 className="text-3xl pt-4 pb-3 text-center">
            React Drawing App
        </h1>
        <div className="flex flex-wrap justify-center items-center text-center py-2 w-full space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center items-center space-x-4">
                <div className="w-1/4 flex items-center justify-center">
                    <div className="flex items-center">
                        <span className="mr-2">Color Picker:</span>
                        <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-10 h-10 border-none p-0"
                        />
                    </div>
                </div>
                <div className="form-check form-check-inline mx-2">
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
                <div className="form-check form-check-inline mx-2">
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
                <div className="form-check form-check-inline mx-2">
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
            <div className="flex space-x-2 flex-wrap justify-center items-center ml-3">
                <button
                    type="button"
                    disabled={elements.length === 0}
                    onClick={handleUndo}
                    className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                    Undo
                </button>
                <button
                    type="button"
                    disabled= { history.length === 0}
                    onClick={handleRedo}
                    className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                    Redo
                </button>
                <button
                    type="button"
                    className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    onClick={handleClearCanvas}
                >
                    Clear Canvas
                </button>
            </div>
        </div>
        
        <div className="w-full h-1/2">
            <Whiteboard 
                canvasRef={canvasRef} 
                ctxRef={ctxRef} 
                elements={elements}
                setElements = {setElements}
                tool={tool}
                color = {color}
                />
        </div>
    </div>
    </div>

  )
}

export default RoomPage
