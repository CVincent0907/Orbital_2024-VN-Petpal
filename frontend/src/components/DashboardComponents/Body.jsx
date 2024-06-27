import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShelterContext } from "../../utils/contexts/ShelterContext";
import { ListedAnimals } from "./ListedAnimals";
import "./dashboard.css";

export default function Body() {
    const navigate = useNavigate();
    const shelterData = useContext(ShelterContext);

    function onClick() {
        navigate('add/');
    }

    return (
        <div>
            <div className="horizontal_bar">
                <h2 className="word">Listed animals</h2>
                <button className="add_button" onClick={onClick} >+</button>
            </div> 

            <ListedAnimals shelter_id={shelterData.shelter_id}/>
        </div>
    );
}