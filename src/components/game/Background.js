import React, { useState, useEffect, useRef } from 'react';
import styled from "styled-components";

const CanvasBackground = styled.canvas`
  position: relative;
  top: 0;
  left: 0;
  z-index: 0;
`

const Background = (props) => {
  // init
  const updateTime = 20;
  const speed = 5;
  const interval = useRef();
  // State
  const [offSet, setOffSet] = useState(0);
  useEffect(()=>{
    return () => {
      clearInterval(interval.current);
    }
  },[])
  useEffect(() => {
    draw();
    setBackgroundMovement();
    return () => {
			clearInterval(interval.current);
		};
  }, [offSet])
  // func
  const setBackgroundMovement = () => {
    interval.current = setInterval(() => {
      if (offSet === 1000-speed) {
        setOffSet(0);
      } else {
        setOffSet(offSet + speed);
      }
    }, updateTime)
  }
  const draw = () => {
    let canvas = document.querySelector('canvas#background');
    let ctx = canvas.getContext('2d');
    let imageObj = new Image();
    imageObj.onload = function () {
      // left
      ctx.drawImage(imageObj, offSet, 0, 1000-offSet, 500, 0, 0, 1000-offSet, 500);
      // right
      ctx.drawImage(imageObj, 0, 0, offSet, 500, 1000 - offSet, 0, offSet, 500);
    }
    imageObj.src = props.bgimg;
  }
  
  return (
    <div>
      <CanvasBackground width="1000px" height="500px" id="background" />
    </div>
  );
}
export default Background;