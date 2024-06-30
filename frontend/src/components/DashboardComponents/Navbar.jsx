import React, { useContext } from "react";
import { ShelterContext } from "../../utils/contexts/ShelterContext";
import petpalSvg from "../../assets/DashboardIcon/PetPal logo.svg";

export default function Navbar({ info }) {
    /* 
    info data structure: {
        title: "",
        icon_src: <src>,
        icon_alt: "",
        icon_onClick: () => {},
    }
    */
    const shelterData = useContext(ShelterContext);
    
    return (
        <nav className="navbar">
                <img className="side_icon" onClick= {info.icon_onClick} src={info.icon_src} alt={info.icon_alt}></img>
                <img className="logo" src={petpalSvg} alt='petpal'></img>
                <h1>{info.title}</h1>
                <img className="profile" src={shelterData.profile_pic} alt='profile'></img>  
        </nav>
    );
}