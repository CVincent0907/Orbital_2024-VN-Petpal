import React from "react";

export default function Buttons(props) {
    return (
        <div className="buttons-container">
            <button type="button" className="button-1" onClick = {props.onClick1}>{props.name1}</button>
            <button type="submit" className="button-2" onClick = {props.onClick2}>{props.name2}</button>
        </div>
    )
}