import React from "react";
import { useNavigate } from "react-router-dom";
import ListedAnimal from "./ListedAnimal";
import "./dashboard.css";

export default function Body() {
    const navigate = useNavigate()

    function onClick() {
        navigate('add/')
    }

    return (
        <div>
            <div className="horizontal_bar">
                <h2 className="word">Listed animal</h2>
                <button className="add_button" onClick={onClick} >+</button>
            </div> 

            <ListedAnimal/>
            <ListedAnimal/>
        </div>
    )
}