import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { UserContext } from "../utils/contexts/UserContext";
import { Navbar } from "../components/UserDashboard/Navbar";
import { Sidebar } from "../components/UserDashboard/Sidebar";
import imagePlaceholder from "../assets/icons/image-placeholder.svg";
import "../components/UserDashboard/userDashboard.css";

export default function UserDashboard() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        document.title = "Dashboard";
        axiosInstance.get("api/auth/acc/")
        .then((res) => {
            setUserData(res.data.data);
            if (!userData.profile_pic) {
                setUserData((data) => ({
                    ...data,
                    profile_pic: imagePlaceholder,
                }));
            }
            setCompleted(true);
            navigate("pets");
        })
        .catch((error) => {
            alert("Error: " + error.Message)
            console.log(error)
        })
    }, []);

    if (!completed) {
        return;
    }

    return (
        <UserContext.Provider value={userData}>
            <main>
                <header>
                    <Navbar />
                </header>
                <Sidebar />
                <Outlet />
            </main>
        </UserContext.Provider>
    )
}