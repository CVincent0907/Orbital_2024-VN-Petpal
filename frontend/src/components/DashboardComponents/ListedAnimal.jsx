import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PetContext } from "../../utils/contexts/PetContext";


export default function ListedAnimal() {
    const navigate = useNavigate();
    const petData = useContext(PetContext);

    const handleClick = (e) => {
        navigate(`../edit/${petData.pet_id}`);
    }

    return (
        <div className="card" onClick={handleClick}>
            <div className="card-top">
                <img src={petData.avatar} alt="Image"></img>
                <div className="text_section">
                    <h2>{petData.name}</h2>
                    <p>{petData.description}</p>
                </div>
            </div>
            <div className="card_bottom">
                <p>Age: {petData.age}</p>
                <p>Type: {petData.type}</p>
                {petData.breed && <p>Breed: {petData.breed}</p>}
            </div>
        </div>
    );
}


