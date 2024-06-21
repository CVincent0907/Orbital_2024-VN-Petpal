import React from "react";

export default function Button(props) {
    return (
        <div className="button-container">
        <button className={props.className} onClick = {props.onClick}>{props.name}</button>
        </div>
    )
}