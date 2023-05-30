import { useEffect, useRef } from "react";
import "./ClockHand.css";

const ClockHand = ({ name, rotation = null, style = null }) => {
  const handReference = useRef();
  useEffect(() => {
    if (rotation) {
      handReference.current.style.transform = `rotate(${rotation}deg)`;
    }
  }, [rotation]);
  return (
    <div
      ref={handReference}
      key={name}
      id={name}
      style={style}
      className="clock-hand"
    >
      <i key={"hand_" + name}></i>
    </div>
  );
};

export default ClockHand;
