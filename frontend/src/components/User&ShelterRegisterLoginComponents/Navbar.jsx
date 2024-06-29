import React from "react";
import Logo from "../../assets/DashboardIcon/PetPal logo.svg";

export default function Navbar() {
    return (
        <nav className="menu-navbar">
            <img className="menupglogo" src={Logo} alt="logo"></img>
        </nav>
    )
}