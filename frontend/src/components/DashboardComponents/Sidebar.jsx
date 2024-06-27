import React, { useContext } from "react";
import { ShelterContext } from "../../utils/contexts/ShelterContext";
import email from "../../assets/DashboardIcon/email_icon.svg";
import img from "../../assets/DashboardIcon/image.svg";
import customizeProfile from "../../assets/DashboardIcon/profile-circle-svgrepo-com 1.svg";
import "./dashboard.css";

export default function Sidebar() {
    const shelterData = useContext(ShelterContext);

    return (
        <div className="sidenav">

            <div className="sidenav-profilepic">
                <img src={shelterData.profile_pic} alt="photo"></img>
                <h2>{shelterData.name}</h2>
            </div>

            <ol className="sidenav-options-container">
                <li className="sidenav-option">
                    <img src={customizeProfile} alt='profile'></img>
                    <p>Customize profile</p>
                </li>
                <li className="sidenav-option">
                    <img src={email} alt="email"></img>
                    <p>Inbox</p>
                </li>
            </ol>
        </div>
    )
}