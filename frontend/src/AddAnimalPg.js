import React from "react";
import { useNavigate } from "react-router-dom";
import BackIcon from "./DashboardComponents/DashboardIcon/back_icon.svg";
import Navbar from "./DashboardComponents/Navbar";
import "./DashboardComponents/dashboard.css";
import Section1 from "./DashboardComponents/section1";


export default function AddAnimalPg() {
    const navigate = useNavigate();
    const onClick = () => {
        navigate('/dashboard')
    }

    return (
        <div>
            <Navbar icon={BackIcon} onClick= {onClick} iconName={"back"} text={"Add animal listing"}/>
            <Section1/>
        </div>
    )
}