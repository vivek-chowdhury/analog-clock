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
          style={{ "--color": "#ffffff" }}
          rotation={handRotation.hRotation}
        />
        <ClockHand
          name="minute"
          style={{ "--color": "#00a6ff" }}
          rotation={handRotation.mRotation}
        />
        <ClockHand
          name="seconds"
          style={{ "--color": "#ff3d58" }}
          rotation={handRotation.sRotation}
        />
        {renderHours()}
      </div>
    </div>
  );
};
export default AnalogClocks;
