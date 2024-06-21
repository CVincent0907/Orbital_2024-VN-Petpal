import React from "react";
import Paw from "../../assets/User&ShelterRegisterLoginIcon/Paw image.png";

export default function Navbar() {
    return (
        <nav className="navbar">
            <img className="paw" src={Paw} alt ="paw"></img>
            <h2 className="petpal">PetPal</h2>
        </nav>
    )
}