import React from "react";
import Body from "./DashboardComponents/Body";
import moreIcon from "./DashboardComponents/DashboardIcon/more_icon.svg";
import Navbar from "./DashboardComponents/Navbar";
import Sidebar from "./DashboardComponents/Sidebar";
import "./DashboardComponents/dashboard.css";

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
