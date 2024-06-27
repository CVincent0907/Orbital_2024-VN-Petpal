import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { ShelterContext } from "../utils/contexts/ShelterContext"
import moreIcon from "../assets/DashboardIcon/more_icon.svg";
import Body from "../components/DashboardComponents/Body";
import Navbar from "../components/DashboardComponents/Navbar";
import Sidebar from "../components/DashboardComponents/Sidebar";
import "../components/DashboardComponents/dashboard.css";
import imagePlaceholder from "../assets/DashboardIcon/image_placeholder.svg"

export default function ShelterDashboard() {
    const [shelterData, setShelterData] = useState({});
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        document.title = "Dashboard";
        axiosInstance.get("api/auth/acc/")
        .then((res) => {
            setShelterData(res.data.data);
            const profilePic = shelterData.profile_pic ? shelterData.profile_pic : imagePlaceholder;
            setShelterData((data) => ({
                ...data,
                profile_pic: profilePic,
            }))
            setCompleted(true);
        })
        .catch((error) => {
            alert("Error: " + error.Message)
            console.log(error)
        })
    }, []);

    // If shelterData is not yet fetched, render nothing.
    if (!completed) {
        return;
    }

    return (
        <ShelterContext.Provider value={shelterData}>
            <div>
                <Navbar icon = {moreIcon} iconName={"more"} />
                <div className="content">
                    <Sidebar/>
                    <Body/>
                </div>
            </div>
        </ShelterContext.Provider>
    )
}
