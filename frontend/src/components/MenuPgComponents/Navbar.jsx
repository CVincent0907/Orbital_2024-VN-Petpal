import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/DashboardIcon/PetPal logo.svg";

export default function Navbar() {
        const navigate = useNavigate();

        const onClick1 = (e) => {
            navigate('/shelter/login')
        }

        const onClick2 = (e) => {
            navigate('/login')
        }

        return (
            	<nav className="menupgnav">
                    <img className="menupglogo" src={Logo} alt="logo"></img>
                    <div className="button-sections">
                        <button className="menupgshelter" onClick={onClick1}>Shelter</button>
                        <button className="menupglogin" onClick={onClick2}>Login</button>
                    </div>
                </nav>
        )
    
}