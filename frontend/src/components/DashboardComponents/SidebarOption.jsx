import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function SidebarOption({ icon, label, url }) {
    const navigate = useNavigate();
    const location = useLocation();

    // Handle navigation when the sidebar option is clicked
    const handleClick = () => {
        navigate(`/shelter/dashboard/${url}`);
    };

    return (
        <li 
            // Apply active class if the current URL matches the sidebar option URL
            className={`sidenav-option${location.pathname.endsWith(url) ? " sidenav-option--active" : ""}`} 
            onClick={handleClick}
        >
            <img src={icon} alt={`${label} icon`} /> {/* Icon for the sidebar option */}
            <p>{label}</p> {/* Label for the sidebar option */}
        </li>
    );
}
