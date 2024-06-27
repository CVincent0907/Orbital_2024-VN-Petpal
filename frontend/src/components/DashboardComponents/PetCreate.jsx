import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate, useOutletContext } from "react-router-dom";
import Button from "../User&ShelterRegisterLoginComponents/Button";
import Particular_section1 from "./Particular_section1";
import Particular_section2 from "./Particular_section2";
import backIcon from "../../assets/DashboardIcon/back_icon.svg";
import "./dashboard.css";


export default function PetCreate() {
    const navigate = useNavigate();
    const { setNavbarInfo } = useOutletContext();
    const [petData, setPetData] = useState({
        name: "",
        avatar: null,
        description: "",
        type: "",
        breed: "",
        age: "",
    });
    // image data sturcture: {image: <image.jpg>, description: ""}
    const [images, setImages] = useState([]);

    useEffect(() => {
        setNavbarInfo({
            title: "Add animal listing",
            icon_src: backIcon,
            icon_alt: "back",
            icon_onClick: () => {},
        })
    })

    const handleFormDataChange = (name, value) => {
        setPetData((data) => ({
            ...data,
            [name]: value
        }));
    };

    const handleAvatarChange = (file) => {
        setPetData((data) => ({
            ...data,
            avatar: file
        }));
    };

    const addImage = (file) => {
        setImages((images) => [
            ...images,
            {
                image: file,
                description: ""
            }
        ]);
    };

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
            navigate("/shelter/dashboard");
        })
        .catch((error) => {
            alert("Error creating pet:", error.message);
        });
    };

    return (
        <form className="create-form">
            <Particular_section1 onChange={handleFormDataChange} onProfilePhotoChange={handleAvatarChange} />
            <hr className="particular_divider" />
            <Particular_section2 onChange={addImage} />
            <div className="button-section1">
                <Button className={"done-button"} name={"Done"} type="submit" onClick={handleSubmit}/>
            </div>
        </form>
    );
}
