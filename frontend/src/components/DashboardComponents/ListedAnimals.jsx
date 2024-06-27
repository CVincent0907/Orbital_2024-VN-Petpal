import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate, useOutletContext } from "react-router-dom";
import { PetContext } from "../../utils/contexts/PetContext";
import { ShelterContext } from "../../utils/contexts/ShelterContext";
import ListedAnimal from "./ListedAnimal";
import imagePlaceholder from "../../assets/icons/image-placeholder.svg";
import backIcon from "../../assets/DashboardIcon/back_icon.svg";
import moreIcon from "../../assets/DashboardIcon/more_icon.svg";
import "./dashboard.css";


export function ListedAnimals() {
    const navigate = useNavigate();
    const { setNavbarInfo } = useOutletContext();
    const shelterData = useContext(ShelterContext);
    const [pets, setPets] = useState([]);

    useEffect(() => {
        setNavbarInfo({
            title: "",
            icon_src: moreIcon,
            icon_alt: "more",
            icon_onClick: () => {},
        })
        axiosInstance.get("api/pets/list/" + shelterData.shelter_id)
        .then((res) => {
            setPets(res.data.pets);
        })
    }, []);

    function goToPetCreation() {
        navigate('/shelter/dashboard/add/');
    }
    
    return (
        <div className="listed-animals-container">
            <div className="listed-animals-header">
                <h2 className="word">Listed animals</h2>
                <button className="add_button" onClick={goToPetCreation} >+</button>
            </div> 
            <div className="listed-animals-list">
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
        </div>
    );
}