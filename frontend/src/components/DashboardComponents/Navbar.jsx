import React from "react";
import petpalSvg from "../../assets/DashboardIcon/PetPal logo.svg";
import profilePicCircle from "../../assets/DashboardIcon/profile_pic.svg";
import "./dashboard.css";

export default function Navbar(props) {

    return (
        <nav className="nav1">
                <img className="side_icon" onClick= {props.onClick} src={props.icon} alt={props.iconName}></img>
                <img className="logo" src={petpalSvg} alt='petpal'></img>
                <h1>{props.text}</h1>
                <img className="profile" src={profilePicCircle} alt='profile'></img>  
        </nav>
    )

}