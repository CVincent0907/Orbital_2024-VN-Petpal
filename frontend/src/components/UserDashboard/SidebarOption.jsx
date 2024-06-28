import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./userDashboard.css";


export function SidebarOption({ icon, label, url }) {
    const navigate = useNavigate();
    const location = useLocation();
    const handleClick = () => {
        navigate(`/dashboard/${url}`);
    }

    return (
        <li className={`sidebar-option${location.pathname.endsWith(url) ? " sidebar-option--active" : ""}`} onClick={handleClick}>
            <img src={icon} alt={`${label} icon`} />
            <p>{label}</p>
        </li>
    );
}