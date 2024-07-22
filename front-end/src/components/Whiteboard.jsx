import React, { useEffect, useState , useLayoutEffect } from 'react'
import rough from 'roughjs'
const roughGenerator = rough.generator();


const Whiteboard = ({canvasRef , ctxRef , elements , setElements , tool , color}) => {
  const [isDrawing , setIsDrawing ] = useState(false);
  

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth*2;
    canvas.height = window.innerHeight*2;
    
    const ctx = canvas.getContext("2d");

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    ctxRef.current = ctx;
  }, []);

  useEffect(() => {
    ctxRef.current.strokeStyle = color;
  }, [color]);

  useLayoutEffect(() => {
    const roughCanvas = rough.canvas(canvasRef.current);

    if(elements.length > 0){
      ctxRef.current.clearRect(0,0, canvasRef.current.width , canvasRef.current.height);
    }
    elements.forEach((element) => {
      if(element.type === "pencil"){
        roughCanvas.linearPath(element.path,
          {
            stroke: element.stroke,
            strokeWidth: 4,
            roughness: 0,
          }
        );
      }else if(element.type === "line"){
        roughCanvas.draw(
          roughGenerator.line(element.offsetX , element.offsetY , element.width , element.height,
            {
              stroke: element.stroke,
              strokeWidth: 4,
              roughness: 0,
            }
          )
        );
      }else if( element.type === "rect"){
        roughCanvas.draw(
          roughGenerator.rectangle(element.offsetX , element.offsetY , element.width , element.height,
            {
              stroke: element.stroke,
              strokeWidth: 4,
              roughness: 0,
            }
          )
        )
      }
    });
  }, [elements]);

  //handling 
  const handleMouseDown = (e) =>{
    const {offsetX , offsetY} = e.nativeEvent;

    if(tool === "pencil"){
      setElements((prevElements) => [
        ...prevElements,
        {
          type:"pencil",
          offsetX,
          offsetY,
          path:[[offsetX,offsetY]],
          stroke: color,
        },
      ]);
    }else if(tool === "line"){
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "line",
          offsetX,
          offsetY,
          width: offsetX,
          height: offsetY,
          stroke:color,
        }
      ]);
    }else if(tool === 'rect'){
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "rect",
          offsetX,
          offsetY,
          width: 0,
          height: 0,
          stroke:color,
        }
      ]);
    }
    
    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    const {offsetX , offsetY} = e.nativeEvent;
    if(isDrawing){

      if(tool === "pencil"){
        const {path} = elements[elements.length -1];
        const newPath = [ ...path , [offsetX, offsetY]];
        setElements((prevElements) => {
          return prevElements.map((ele,index) =>{
            if (index === elements.length-1){
              return {
                ...ele,
                path: newPath,
              };
            }else{
              return ele;
            }
          });
        });
      }else if(tool === "line"){
        setElements((prevElements) => {
          return prevElements.map((ele,index) =>{
            if (index === elements.length-1){
              return {
                ...ele,
                width:offsetX,
                height: offsetY,
              };
            }else{
              return ele;
            }
          });
        });
      }else if (tool === "rect"){
        setElements((prevElements) => {
          return prevElements.map((ele,index) =>{
            if (index === elements.length-1){
              return {
                ...ele,
                width:offsetX - ele.offsetX,
                height: offsetY -ele.offsetY,
              };
            }else{
              return ele;
            }
          });
        });
      }
    }
    console.log(offsetX,offsetY);
  };

  const handleMouseUp = () =>{
    setIsDrawing(false);
  };

  return (
    <div
      className="md:col-span-8 overflow-hidden border-2 border-gray-800 px-0 mx-auto mt-3"
      style={{ height: "500px" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
    <canvas ref={canvasRef}/>
    </div>

  )
}


export default Whiteboard
