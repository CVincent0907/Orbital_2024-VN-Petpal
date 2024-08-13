import React, { useContext } from "react";
import petpalSvg from "../../assets/DashboardIcon/PetPal logo.svg";
import imagePlaceholder from "../../assets/icons/image-placeholder.svg";
import { ShelterContext } from "../../utils/contexts/ShelterContext";


export default function Navbar() {
    const shelterData = useContext(ShelterContext);

    return (
        <nav className="navbar">
            <img className="logo" src={petpalSvg} alt='petpal' />
            <img className="profile" src={shelterData.profile_pic ? shelterData.profile_pic : imagePlaceholder} alt='profile' />
        </nav>
    );
}
