import React, { useContext } from "react";
import { PetContext } from "../../utils/contexts/PetContext";
import "./dashboard.css";


export default function ListedAnimal() {
    const petData = useContext(PetContext);

    const handleClick = (e) => {
        return;
    }

    return (
        <div className="card" onClick={handleClick}>
            <div className="listed_animal">
                <img src={petData.avatar} alt="Image"></img>
                <div className="text_section">
                    <h2>{petData.name}</h2>
                    <p>{petData.description}</p>
                </div>
            </div>
            <div className="card_bottom">
                <h3>Age: {petData.age}</h3>
                <h3>Type: {petData.type}</h3>
                <h3>Breed: {petData.breed}</h3>
            </div>
        </div>
    );
}


