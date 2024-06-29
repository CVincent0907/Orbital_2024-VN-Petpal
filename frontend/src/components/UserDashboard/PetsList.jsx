import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { PetContext } from "../../utils/contexts/PetContext";
import { PetsListItem } from "./PetsListItem";
import imagePlaceholder from "../../assets/icons/image-placeholder.svg";


export function PetsList() {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        axiosInstance.get("api/pets/list/")
        .then((res) => {
            setPets(res.data.pets);
        })
    }, []);

    return (
        <ol className="petslist-container">
            {pets.length == 0
                ? <p>No listed pets</p>
                : pets.map((petData) => {
                    const avatar = petData.avatar ? petData.avatar : imagePlaceholder;
                    return (<PetContext.Provider value={{...petData, avatar: avatar}}>
                            <PetsListItem />
                        </PetContext.Provider>);
                    })
            }
        </ol>
    )
}
