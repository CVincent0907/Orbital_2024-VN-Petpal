import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import email from "../../assets/DashboardIcon/email_icon.svg";
import customizeProfile from "../../assets/DashboardIcon/profile-circle-svgrepo-com 1.svg";
import imagePlaceholder from "../../assets/icons/image-placeholder.svg";
import pawIcon from "../../assets/icons/paw.svg";
import axiosInstance from "../../utils/axiosInstance";
import { ShelterContext } from "../../utils/contexts/ShelterContext";
import ConfirmLogoutModal from "./ConfirmLogoutModal";
import { SidebarOption } from "./SidebarOption";
import logoutIcon from "../../assets/icons/logout.svg";

export default function Sidebar() {
    const shelterData = useContext(ShelterContext);
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
        <div className="sidenav">

            <div className="sidenav-profilepic">
                <img src={shelterData.profile_pic ? shelterData.profile_pic : imagePlaceholder} alt="photo"></img>
                <h2>{shelterData.name}</h2>
            </div>

            <ol className="sidenav-options-container">
                <SidebarOption icon={pawIcon} label="Listed animals" url="list" />
                <SidebarOption icon={customizeProfile} label="Customize Profile" url="profile" />
                <SidebarOption icon={email} label="Inbox" url="chats" />
                <li className="sidenav-option" onClick={handleLogoutClick}>
                    <img src={logoutIcon} alt="logout icon" />
                    <p>Logout</p>
                </li>
                <ConfirmLogoutModal 
                    isOpen={isModalOpen}
                    onRequestClose={handleCancel}
                    onConfirm={handleConfirm}
                />
            </ol>
        </div>
    )
}


// import React, { useContext } from "react";
// import { ShelterContext } from "../../utils/contexts/ShelterContext";
// import email from "../../assets/DashboardIcon/email_icon.svg";
// import customizeProfile from "../../assets/DashboardIcon/profile-circle-svgrepo-com 1.svg";
// import pawIcon from "../../assets/icons/paw.svg";
// import imagePlaceholder from "../../assets/icons/image-placeholder.svg";
// import { SidebarOption } from "./SidebarOption";

// export default function Sidebar() {
//     const shelterData = useContext(ShelterContext);

//     return (
//         <div className="sidenav">

//             <div className="sidenav-profilepic">
//                 <img src={shelterData.profile_pic ? shelterData.profile_pic : imagePlaceholder} alt="photo"></img>
//                 <h2>{shelterData.name}</h2>
//             </div>

//             <ol className="sidenav-options-container">
//                 <SidebarOption icon={pawIcon} label="Listed animals" url="list" />
//                 <SidebarOption icon={customizeProfile} label="Customize Profile" url="profile" />
//                 <SidebarOption icon={email} label="Inbox" url="chats" />
//             </ol>
//         </div>
//     )
// }
