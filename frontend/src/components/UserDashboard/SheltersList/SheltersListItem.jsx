import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShelterContext } from "../../../utils/contexts/ShelterContext";
import locationIcon from "../../../assets/icons/location.svg";


export function SheltersListItem() {
    const navigate = useNavigate();
    const shelterData = useContext(ShelterContext);

    const handleClick = (e) => {
        navigate(`/dashboard/shelters/${shelterData.shelter_id}`);
    }

    return (
        <li className="shelterslist-item" onClick={handleClick}>
            <div className="shelterslist-item-top">
                <img src={shelterData.profile_pic} alt="Shelter profile picture"></img>
                <div className="shelterslist-item-desc">
                    <h2>{shelterData.name}</h2>
                    <p>{shelterData.description}</p>
                </div>
            </div>
            <div className="shelterslist-item-bottom">
                <img src={locationIcon} alt="location icon" />
                <p>{shelterData.country}</p>
            </div>
        </li>
    );
}


