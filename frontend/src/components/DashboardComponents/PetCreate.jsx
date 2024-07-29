import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import backIcon from "../../assets/DashboardIcon/back_icon.svg";
import axiosInstance from "../../utils/axiosInstance";
import Particular_section1 from "./Particular_section1";
import Particular_section2 from "./Particular_section2";

export default function PetCreate() {
    const navigate = useNavigate();
    const [petData, setPetData] = useState({
        name: "",
        avatar: null,
        description: "",
        type: "",
        breed: "",
        age: "",
    });
    // Image data structure: {image: <image.jpg>, description: ""}
    const [images, setImages] = useState([]);

    // Handle changes to the form data
    const handleFormDataChange = (name, value) => {
        setPetData((data) => ({
            ...data,
            [name]: value
        }));
    };

    // Handle changes to the avatar image
    const handleAvatarChange = (file) => {
        setPetData((data) => ({
            ...data,
            avatar: file
        }));
    };

    // Add a new image to the images array
    const addImage = (file) => {
        setImages((images) => [
            ...images,
            {
                image: file,
                description: ""
            }
        ]);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();    
        axiosInstance.postForm("/api/pets/create/", petData)
        .then((res) => {
            alert("Pet created successfully, uploading images...");
            for (const image of images) {
                axiosInstance.postForm(`/api/pets/add-photo/${res.data.pet_id}`, image)
                .catch((error) => {
                    alert("Error uploading photo:", error.message);
                });
            }
        })
        .then(() => {
            navigate("/shelter/dashboard/list");
        })
        .catch((error) => {
            alert("Error creating pet:", error.message);
        });
    };

    return (
        <form className="create-form">
            <Particular_section1 onChange={handleFormDataChange} onProfilePhotoChange={handleAvatarChange} />
            <hr />
            <Particular_section2 onChange={addImage} />
            <button className={"done-button"} name={"Done"} type="submit" onClick={handleSubmit}>Done</button>
        </form>
    );
}
