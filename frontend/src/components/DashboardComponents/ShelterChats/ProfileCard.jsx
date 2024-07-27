import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import imagePlaceholder from "../../../assets/icons/image-placeholder.svg";
import houseIcon from "../../../assets/icons/house.svg";
import userIcon from "../../../assets/icons/user.svg";

export function ProfileCard({ id }) {
    const [account, setAccount] = useState({});
    const [role, setRole] = useState("");
    const [lastSeen, setLastSeen] = useState("");

    function calcLastSeen(last_login) {
        if (last_login) {
            const date1 = new Date(last_login);
            const date2 = new Date();
            const diff_ms = date2.getTime() - date1.getTime();
            const diff_days = Math.floor(diff_ms / (1000 * 3600 * 24));
            setLastSeen(diff_days === 0 ? "today" : diff_days === 1 ? "yesterday" : `${diff_days} days ago`);
        } else {
            setLastSeen("a long time ago");
        }
    }

    useEffect(() => {
        axiosInstance.get(`/api/auth/acc/${id}/`)
        .then((res) => {
            const profile_pic = res.data.data.profile_pic ? res.data.data.profile_pic : imagePlaceholder;
            setAccount({...res.data, 'profile_pic': profile_pic});
            setRole(res.data.role);
            calcLastSeen(res.data.last_login);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [id]);

    return (
        <div className="profileCard-container" >
            <img className="avatar" src={account.profile_pic} alt="avatar" />
            <div className="chat-desc">
                <h3>{role == "USER" 
                    ? account.data.display_name 
                    : role == "SHELTER"
                    ? account.data.name
                    : "unknown"
                }</h3>
                <p>last seen: {lastSeen}</p>
            </div>
            {role == "USER"
                ? <img className="role-icon" src={userIcon} alt="user icon" />
                : role == "SHELTER"
                ? <img className="role-icon" src={houseIcon} alt="shelter icon" />
                : <></>
            }
        </div>
    );
}