import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PetContext } from "../../utils/contexts/PetContext";


export function PetsListItem() {
    const navigate = useNavigate();
    const petData = useContext(PetContext);

    const handleClick = (e) => {
        navigate(`./${petData.pet_id}`);
    }

    return (
        <li className="petslist-item" onClick={handleClick}>
            <div className="petslist-item-top">
                <img src={petData.avatar} alt="Pet avatar"></img>
                <div className="petslist-item-desc">
                    <h2>{petData.name}</h2>
                    <p>{petData.description}</p>
                </div>
            </div>
            <div className="petslist-item-bottom">
                <p>Age: {petData.age}</p>
                <p>Type: {petData.type}</p>
                {petData.breed && <p>Breed: {petData.breed}</p>}
            </div>
        </li>
    );
}


