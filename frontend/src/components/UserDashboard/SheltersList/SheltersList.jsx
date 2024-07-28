import React, { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { useSearchParams } from "react-router-dom";
import { ShelterContext } from "../../../utils/contexts/ShelterContext";
import { SheltersListItem } from "./SheltersListItem";
import imagePlaceholder from "../../../assets/icons/image-placeholder.svg";
import { ShelterSearch } from "./ShelterSearch";


export function SheltersList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [shelters, setShelters] = useState([]);

    useEffect(() => {
        document.title = "Shelters";
        const q = searchParams.get('q');
        axiosInstance.get(`api/shelters/list/${q ? q + "/" : ""}`)
        .then((res) => {
            setShelters(res.data.shelters);
        })
    }, [searchParams]);

    return (
        <>
            <ShelterSearch />
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
        </>
    );
}