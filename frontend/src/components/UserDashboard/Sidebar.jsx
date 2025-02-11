import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import chatIcon from "../../assets/icons/chat.svg";
import shelterIcon from "../../assets/icons/house.svg";
import pawIcon from "../../assets/icons/paw.svg";
import profileIcon from "../../assets/icons/profile.svg";
import axiosInstance from "../../utils/axiosInstance";
import ConfirmLogoutModal from "./ConfirmLogoutModal";
import { SidebarOption } from "./SidebarOption";
import LogoutIcon from "../../assets/icons/logout.svg";


export function Sidebar() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleConfirm = async () => {
        axiosInstance.post('/api/auth/logout/')
        .then((res) => {
          navigate('/'); 
        })
        .catch((error) => {
          alert("Error: " + error.message);
          console.error(error);
        });
    }

    return (
            <ol className="sidebar">
                <SidebarOption icon={pawIcon} label="Pets" url="pets" />
                <SidebarOption icon={shelterIcon} label="Shelters" url="shelters" />
                <SidebarOption icon={chatIcon} label="Chats" url="chats" />
                <SidebarOption icon={profileIcon} label="Profile" url="profile" />
                <li className="sidebar-option" onClick={handleLogoutClick}>
                    <img src={LogoutIcon} alt="logout icon" />
                    <p>Logout</p>
                </li>
                <ConfirmLogoutModal 
                    isOpen={isModalOpen}
                    onRequestClose={handleCancel}
                    onConfirm={handleConfirm}
                />
            </ol>
    );
}



// import React from "react";
// import { SidebarOption } from "./SidebarOption";
// import pawIcon from "../../assets/icons/paw.svg";
// import shelterIcon from "../../assets/icons/house.svg";
// import chatIcon from "../../assets/icons/chat.svg";
// import profileIcon from "../../assets/icons/profile.svg";


// export function Sidebar() {
//     // TODO: update options handling

//     return (
//         <ol className="sidebar">
//             <SidebarOption icon={pawIcon} label="Pets" url="pets" />
//             <SidebarOption icon={shelterIcon} label="Shelters" url="shelters" />
//             <SidebarOption icon={chatIcon} label="Chats" url="chats" />
//             <SidebarOption icon={profileIcon} label="Profile" url="profile" />
//         </ol>
//     );
// }
