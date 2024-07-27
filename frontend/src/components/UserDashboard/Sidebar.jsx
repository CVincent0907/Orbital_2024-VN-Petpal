import React from "react";
import { SidebarOption } from "./SidebarOption";
import pawIcon from "../../assets/icons/paw.svg";
import shelterIcon from "../../assets/icons/house.svg";
import chatIcon from "../../assets/icons/chat.svg";
import profileIcon from "../../assets/icons/profile.svg";


export function Sidebar() {
    // TODO: update options handling

    return (
        <ol className="sidebar">
            <SidebarOption icon={pawIcon} label="Pets" url="pets" />
            <SidebarOption icon={shelterIcon} label="Shelters" url="shelters" />
            <SidebarOption icon={chatIcon} label="Chats" url="chats" />
            <SidebarOption icon={profileIcon} label="Profile" url="profile" />
        </ol>
    );
}