import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import moreIcon from "../../assets/DashboardIcon/more_icon.svg";
import imagePlaceholder from "../../assets/icons/image-placeholder.svg";
import axiosInstance from "../../utils/axiosInstance";
import { PetContext } from "../../utils/contexts/PetContext";
import { ShelterContext } from "../../utils/contexts/ShelterContext";
import ListedAnimal from "./ListedAnimal";

export function ListedAnimals() {
    const navigate = useNavigate();
    const { setNavbarInfo } = useOutletContext();
    const shelterData = useContext(ShelterContext);
    const [pets, setPets] = useState([]);

    useEffect(() => {
        // Set the navigation bar information
        setNavbarInfo({
            title: "",
            icon_src: moreIcon,
            icon_alt: "more",
            icon_onClick: () => {},
        });
        
        // Fetch the list of pets from the shelter
        axiosInstance.get("api/pets/list/?sid=" + shelterData.shelter_id)
        .then((res) => {
            setPets(res.data.pets);
        });
    }, []);

    // Navigate to the pet creation page
    function goToPetCreation() {
        navigate('/shelter/dashboard/add/');
    }
    
    return (
        <div className="listed-animals-container">
            <div className="listed-animals-header">
                <h2 className="word">Listed animals</h2>
                <button className="add_button" onClick={goToPetCreation}><p>+</p></button>
            </div> 
            <div className="listed-animals-list">
                {pets.length === 0 
                ? <p>No listed animals.</p> // Show message if no pets are listed
                : pets.map((petData) => {
                        // Use placeholder image if pet has no avatar
                        const avatar = petData.avatar ? petData.avatar : imagePlaceholder;
                        return (
                            <PetContext.Provider value={{...petData, avatar: avatar}}>
                                <ListedAnimal />
                            </PetContext.Provider>
                        );
                    })
                }
            </div>
        </div>
    );
}
