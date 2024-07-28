import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import imagePlaceholder from "../../assets/icons/image-placeholder.svg";
import axiosInstance from "../../utils/axiosInstance";
import { ShelterContext } from "../../utils/contexts/ShelterContext";
import { ImagesSection } from "./ImagesSection";
import { SheltersListItem } from "./SheltersList/SheltersListItem";

export function PetView() {
    // Extract pet ID from URL parameters
    const { id } = useParams();
    const [petData, setPetData] = useState({});
    const [shelterData, setShelterData] = useState({});
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        // Fetch pet details using the pet ID
        axiosInstance.get(`/api/pets/detail/${id}`)
        .then((res) => {
            setPetData(res.data);

            // Set placeholder image if pet does not have an avatar
            if (!res.data.avatar) {
                setPetData((data) => ({
                    ...data,
                    avatar: imagePlaceholder,
                }));
            }

            // Fetch shelter details using the shelter ID from pet data
            axiosInstance.get(`/api/shelters/detail/${res.data.shelter_id}`)
            .then((res) => {
                setShelterData(res.data);

                // Set placeholder image if shelter does not have a profile picture
                if (!res.data.profile_pic) {
                    setShelterData((data) => ({
                        ...data,
                        profile_pic: imagePlaceholder,
                    }));
                }

                // Mark the data as fully loaded
                setCompleted(true);
                
                // Set the document title to include the pet's name
                document.title = `View Pet: ${petData.name}`;
            })
            .catch((error) => {
                alert("Error fetching shelter data: " + error.Message);
                console.log(error);
            });
        })
        .catch((error) => {
            alert("Error: " + error.Message);
            console.log(error);
        });
    }, [id]); // Added `id` as a dependency to re-run effect if `id` changes

    // Render nothing until data fetching is complete
    if (!completed) {
        return null; // Return null to avoid rendering an incomplete component
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
                {/* Provide shelter data to ShelterContext */}
                <ShelterContext.Provider value={shelterData}>
                    <SheltersListItem />
                </ShelterContext.Provider>
            </div>
        </div>
    );
}
