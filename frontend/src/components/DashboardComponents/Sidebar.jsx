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

            <div className="photo_section">
            <img src={shelterData.profile_pic} alt="photo"></img>
            <h2>{shelterData.name}</h2>
            </div>

            <hr className="linebreak"/>

            <div className="profile_section">
                <img src={customizeProfile} alt='profile'></img>
                <h2 className="point">Customize profile</h2>
            </div>

            <div className="email_section">
                <img src={email} alt="email"></img>
                <h2 className="point">Inbox</h2>
            </div>
        </div>
    )
}