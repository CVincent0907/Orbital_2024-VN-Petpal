import React, { useContext } from "react";
import { UserContext } from "../../utils/contexts/UserContext";
import petpalLogo from "../../assets/PetPal-logo.svg";
// import moreIcon from "../../assets/icons/more.svg";


export function Navbar() {
    const userData = useContext(UserContext);

    return (
        <nav className="navbar">
            {/* <img className="navbar-icon" src={moreIcon} alt="more icon"></img> */}
            <img className="navbar-logo" src={petpalLogo} alt="PetPal logo"></img>
            <img className="navbar-profile" src={userData.profile_pic} alt="profile picture"></img>
        </nav>
    );
}