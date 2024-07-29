import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Outlet, useNavigate } from "react-router-dom";
import { ShelterContext } from "../utils/contexts/ShelterContext"
import moreIcon from "../assets/DashboardIcon/more_icon.svg";
import Navbar from "../components/DashboardComponents/Navbar";
import Sidebar from "../components/DashboardComponents/Sidebar";


export default function ShelterDashboard() {
    const navigate = useNavigate();
    const [shelterData, setShelterData] = useState({});
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        document.title = "Dashboard";
        axiosInstance.get("api/auth/acc/")
        .then((res) => {
            if (res.data.role !== "SHELTER") {
                navigate("/dashboard/pets");
                return;
            }
            setShelterData(res.data.data);
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
