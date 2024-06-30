import React, { useContext } from "react";
import { ShelterContext } from "../../utils/contexts/ShelterContext";
import email from "../../assets/DashboardIcon/email_icon.svg";
import customizeProfile from "../../assets/DashboardIcon/profile-circle-svgrepo-com 1.svg";
import pawIcon from "../../assets/icons/paw.svg";
import imagePlaceholder from "../../assets/icons/image-placeholder.svg";
import { SidebarOption } from "./SidebarOption";

export default function Sidebar() {
    const shelterData = useContext(ShelterContext);

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
            </ol>
        </div>
    )
}