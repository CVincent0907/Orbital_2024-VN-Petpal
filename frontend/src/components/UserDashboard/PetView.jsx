import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import imagePlaceholder from "../../assets/icons/image-placeholder.svg";
import axiosInstance from "../../utils/axiosInstance";
import { ShelterContext } from "../../utils/contexts/ShelterContext";
import { ImagesSection } from "./ImagesSection";
import { SheltersListItem } from "./SheltersListItem";


export function PetView() {
    const { id } = useParams();
    const [petData, setPetData] = useState({});
    const [shelterData, setShelterData] = useState({});
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        axiosInstance.get(`/api/pets/detail/${id}`)
        .then((res) => {
            setPetData(res.data);
            if (!res.data.avatar) {
                setPetData((data) => ({
                    ...data,
                    avatar: imagePlaceholder,
                }));
            }
            axiosInstance.get(`/api/shelters/detail/${res.data.shelter_id}`)
            .then((res) => {
                setShelterData(res.data);
                if (!res.data.profile_pic) {
                    setShelterData((data) => ({
                        ...data,
                        profile_pic: imagePlaceholder,
                    }));
                }
                setCompleted(true);
                document.title = `View Pet: ${petData.name}`;
            })
            .catch((error) => {
                alert("Error fetching shelter data: " + error.Message)
                console.log(error)
            });
        })
        .catch((error) => {
            alert("Error: " + error.Message)
            console.log(error)
        });
    }, []);

    if (!completed) {
        return;
    }
    return (
        <div className="petview-container">
            <div className="petview-body">
                <div className="petview-desc-top">
                    <img src={petData.avatar} alt="Pet avatar" />
                    <div className="petview-desc-info">
                        <h2>{petData.name}</h2>
                        {petData.description 
                            ? <p>{petData.description}</p> 
                            : <p>No description for this pet was added.</p> 
                        }
                    </div>
                </div>
                <div className="petview-desc-bottom">
                    <p>Age: {petData.age}</p>
                    <p>Type: {petData.type}</p>
                    {petData.breed && <p>Breed: {petData.breed}</p>}
                </div>
            </div>
            <hr />
            <div className="petview-body">
                <h2>Photos & videos</h2>
                <ImagesSection images={petData.images} />
            </div>
            <hr />
            <div className="petview-body">
                <h2>Shelter</h2>
                <ShelterContext.Provider value={shelterData}>
                    <SheltersListItem />
                </ShelterContext.Provider>
            </div>
        </div>
    );
}