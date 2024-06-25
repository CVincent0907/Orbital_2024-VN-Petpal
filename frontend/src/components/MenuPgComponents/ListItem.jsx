import React from "react";

export default function ListItem(props) {
    return (
        <div className="list-items">
            <img src={props.img}></img> 
            <h3>{props.content}</h3>
        </div>
    )
}