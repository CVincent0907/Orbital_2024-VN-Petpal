import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { PetContext } from "../../utils/contexts/PetContext"
import ListedAnimal from "./ListedAnimal";
import imagePlaceholder from "../../assets/icons/image-placeholder.svg"


export function ListedAnimals({ shelter_id }) {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        axiosInstance.get("api/pets/list/" + shelter_id)
        .then((res) => {
            setPets(res.data.pets);
        })
    }, []);
    
    return (
        <div className="listed-animals-container">
            {pets.length == 0 
            ? <p>No listed animals.</p>
            : pets.map((petData) => {
                    const avatar = petData.avatar ? petData.avatar : imagePlaceholder;
                    return (<PetContext.Provider value={{...petData, avatar: avatar}}>
                            <ListedAnimal />
                        </PetContext.Provider>);
                    })
            }
        </div>
    );
}