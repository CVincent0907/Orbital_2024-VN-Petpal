import React from "react";
import moreIcon from "../assets/DashboardIcon/more_icon.svg";
import Body from "../components/DashboardComponents/Body";
import Navbar from "../components/DashboardComponents/Navbar";
import Sidebar from "../components/DashboardComponents/Sidebar";
import "../components/DashboardComponents/dashboard.css";

export default function Dashboard() {
    return (
        <div>
            <Navbar icon = {moreIcon} iconName={"more"} />
            <div className="content">
                <Sidebar/>
                <Body/>
            </div>
        </div>
    )
}
