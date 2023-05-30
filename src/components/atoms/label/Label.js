import React from "react";
import "./Label.css";

export const LabelTypes = {
    LIGHT: "Light-Label",
    MEDIUM: "Medium-Label",
    LARGE: "Large-Label"
}

const Label = ( { label, type = LabelTypes.LIGHT, optionalStyle = null }) => {
 return <span style={optionalStyle} className={type}><b>{label}</b></span>
}
export default Label;