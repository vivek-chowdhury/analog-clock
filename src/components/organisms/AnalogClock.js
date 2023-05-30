import { useEffect, useState } from "react";
import Label, { LabelTypes } from "../atoms/label/Label";
import * as Constants from "./AnalogClockConstants";
import ClockHand from "../atoms/clock-hand/ClockHand";
import "./AnalogClocks.css";

export const AnalogLabelTypes = {
  NUMERIC_LABEL: "number",
  ROMAN_LABEL: "roman",
};

const AnalogClocks = ({ labelStyle = AnalogLabelTypes.NUMERIC_LABEL }) => {
  const [handRotation, setHandRotation] = useState({
    hRotation: null,
    mRotation: null,
    sRotation: null,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateClockHands();
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const updateClockHands = () => {
    const date = new Date();
    const hh = date.getHours();
    const mm = date.getMinutes();
    const ss = date.getSeconds();
    setHandRotation(() => {
      /*
        Case 1:
            60min = 30 degree
            1min = 30/60 = 1/2
            m mins (here m can be any number between 1 - 60) = (1/2)m degree (or (1/2) * m degree)

        Case 2: Hour rotation
            12h = 360 degree
            1h = 360/12 = 30 degree
            h hours (here h can be any number between 1-12) = 30 * h + m/2 degree (or 30h + m/2 degree)

        Case 3: Minutes rotation
            60min = 360 degree
            1min = 360/60 = 6 degree
            m minutes = 6m (or 6 * m)
        
        Case 4: Seconds rotation
            60 sec = 360 degree
            1 sec = 360/60 = 6 degree
            s seconds = 6s (or 6 * s)
       */
      return {
        hRotation: 30 * hh + mm / 2,
        mRotation: 6 * mm,
        sRotation: 6 * ss,
      };
    });
  };
  const renderHours = () => {
    return Constants.hourLabel.map((hour, index) => (
      <Label
        key={hour.uid}
        optionalStyle={{ "--rindex": index }}
        label={hour[labelStyle]}
        type={LabelTypes.MEDIUM}
      />
    ));
  };

  return (
    <div className="analog-container">
      <div className="analog-clock">
        <ClockHand
          name="hour"
          style={{ "--color": "#ffffff", "--height": "82px" }}
          rotation={handRotation.hRotation}
        />
        <ClockHand
          name="minute"
          style={{ "--color": "#00a6ff", "--height": "92px" }}
          rotation={handRotation.mRotation}
        />
        <ClockHand
          name="seconds"
          style={{ "--color": "#ff3d58", "--height": "102px" }}
          rotation={handRotation.sRotation}
        />
        {renderHours()}
      </div>
    </div>
  );
};
export default AnalogClocks;
