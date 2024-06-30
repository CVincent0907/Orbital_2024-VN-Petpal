import React from "react";
import { useLocation, useNavigate } from "react-router-dom";


export function SidebarOption({ icon, label, url }) {
    const navigate = useNavigate();
    const location = useLocation();
    const handleClick = () => {
        navigate(`/shelter/dashboard/${url}`);
    }

    return (
        <li className={`sidenav-option${location.pathname.endsWith(url) ? " sidenav-option--active" : ""}`} onClick={handleClick}>
            <img src={icon} alt={`${label} icon`} />
            <p>{label}</p>
        </li>
    );
}