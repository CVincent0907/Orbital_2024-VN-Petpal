import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { PetContext } from "../../../utils/contexts/PetContext";
import { PetsListItem } from "./PetsListItem";
import imagePlaceholder from "../../../assets/icons/image-placeholder.svg";
import { PetSearch } from "./PetSearch";


export function PetsList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [pets, setPets] = useState([]);

    useEffect(() => {
        document.title = "Pets";
        axiosInstance.get(`api/pets/list/?${searchParams.toString()}`)
        .then((res) => {
            setPets(res.data.pets);
        });
    }, [searchParams]);

    return (
        <>
            <PetSearch />
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
        </>
    )
}
