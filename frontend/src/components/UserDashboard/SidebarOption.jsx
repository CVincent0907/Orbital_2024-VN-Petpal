import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function SidebarOption({ icon, label, url }) {
    // Hook to navigate programmatically
    const navigate = useNavigate();
    // Hook to access the current location
    const location = useLocation();

    // Function to handle click events
    const handleClick = () => {
        // Navigate to the URL when the sidebar option is clicked
        navigate(`/dashboard/${url}`);
    }

    return (
        <li 
            // Apply active class if the current path ends with the provided URL
            className={`sidebar-option${location.pathname.endsWith(url) ? " sidebar-option--active" : ""}`} 
            onClick={handleClick}
        >
            {/* Render the icon for the sidebar option */}
            <img src={icon} alt={`${label} icon`} />
            {/* Render the label for the sidebar option */}
            <p>{label}</p>
        </li>
    );
}
