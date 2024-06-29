import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { ShelterContext } from "../../utils/contexts/ShelterContext";
import { SheltersListItem } from "./SheltersListItem";
import imagePlaceholder from "../../assets/icons/image-placeholder.svg";


export function SheltersList() {
    const [shelters, setShelters] = useState([]);

    useEffect(() => {
        document.title = "Shelters"
        axiosInstance.get("api/shelters/list/")
        .then((res) => {
            setShelters(res.data.shelters);
        })
    }, []);

    return (
        <ol className="shelterslist-container">
            {shelters.length == 0
                ? <p>No registered shelters</p>
                : shelters.map((shelterData) => {
                    const profile_pic = shelterData.profile_pic ? shelterData.profile_pic : imagePlaceholder;
                    return (<ShelterContext.Provider value={{...shelterData, profile_pic: profile_pic}}>
                            <SheltersListItem />
                        </ShelterContext.Provider>);
                    })
            }
        </ol>
    );
}