import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Outlet, useNavigate } from "react-router-dom";
import { ShelterContext } from "../utils/contexts/ShelterContext"
import moreIcon from "../assets/DashboardIcon/more_icon.svg";
import Navbar from "../components/DashboardComponents/Navbar";
import Sidebar from "../components/DashboardComponents/Sidebar";
import imagePlaceholder from "../assets/DashboardIcon/image_placeholder.svg"


export default function ShelterDashboard() {
    const navigate = useNavigate();
    const [shelterData, setShelterData] = useState({});
    const [completed, setCompleted] = useState(false);
    // TODO: improve navbar icon handling
    const [navbarInfo, setNavbarInfo] = useState({
        title: "",
        icon_src: moreIcon,
        icon_alt: "more",
        icon_onClick: () => {},
    });

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
            navigate("list/");
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
            <main className="shelterdashboard-main">
                <header className="shelterdashboard-header">
                    <Navbar info={navbarInfo} />
                </header>
                <Sidebar />
                <Outlet context={{setNavbarInfo: setNavbarInfo}} />
            </main>
        </ShelterContext.Provider>
    )
}
