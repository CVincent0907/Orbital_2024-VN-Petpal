import React, { useContext } from "react";
import { ShelterContext } from "../../utils/contexts/ShelterContext";
import petpalSvg from "../../assets/DashboardIcon/PetPal logo.svg";
import profilePicCircle from "../../assets/DashboardIcon/profile_pic.svg";
import "./dashboard.css";

export default function Navbar(props) {
    const shelterData = useContext(ShelterContext);

    return (
        <nav className="nav1">
                <img className="side_icon" onClick= {props.onClick} src={props.icon} alt={props.iconName}></img>
                <img className="logo" src={petpalSvg} alt='petpal'></img>
                <h1>{props.text}</h1>
                <img className="profile" src={shelterData.profile_pic} alt='profile'></img>  
        </nav>
    )

}