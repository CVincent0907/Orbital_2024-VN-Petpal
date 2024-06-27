import React from "react";
import { useNavigate } from "react-router-dom";
import BackIcon from "../assets/DashboardIcon/back_icon.svg";
import Navbar from "../components/DashboardComponents/Navbar";
import "../components/DashboardComponents/dashboard.css";
import Section1 from "../components/DashboardComponents/section1";


export default function AddAnimalPg() {
    const navigate = useNavigate();
    const onClick = () => {
        navigate('/shelter/dashboard');
    }

    return (
        <div>
            <Navbar icon={BackIcon} onClick= {onClick} iconName={"back"} text={"Add animal listing"}/>
            <Section1/>
        </div>
    )
}