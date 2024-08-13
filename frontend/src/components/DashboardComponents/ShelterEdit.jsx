import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { ShelterContext } from "../../utils/contexts/ShelterContext";
import { Address } from "../ui/Address";
import { CountrySelectionField } from "../ui/CountrySelectionField";
import { ImageUpload } from "../ui/ImageUpload";
import { InputField } from "../ui/InputField";

import Email from "../../assets/icons/email.svg";
import Location from "../../assets/icons/location.svg";
import Phone from "../../assets/icons/phone.svg";
import { MediaUploadSection } from "./MediaUploadSection";

export function ShelterEdit() {
    useEffect(() => {
        // Set the document title to "Edit Profile"
        document.title = "Edit Profile";
    }, []);

    const [dataChanged, setDataChanged] = useState(false); // Tracks if any data has changed
    const [avatarChanged, setAvatarChanged] = useState(false); // Tracks if the avatar has changed
    const initShelterData = useContext(ShelterContext); // Get initial shelter data from context

    const [shelterData, setShelterData] = useState({
        name: initShelterData.name,
        description: initShelterData.description,
        contact_email: initShelterData.contact_email,
        country: initShelterData.country,
        phone_number: initShelterData.phone_number,
    });

    const [newImages, setNewImages] = useState([]);
    const [address, setAddress] = useState(initShelterData.address);
    const [avatar, setAvatar] = useState(initShelterData.profile_pic);

    // Update shelter data and mark it as changed
    const setParticularData = (name, value) => {
        setShelterData((data) => ({
            ...data,
            [name]: value,
        }));
        setDataChanged(true);
    };

    // Update country and address, and mark data as changed
    const setCountry = (value) => {
        setShelterData((data) => ({
            ...data,
            country: value,
        }));
        setAddress((addr) => ({
            ...addr,
            country: value,
        }));
        setDataChanged(true);
    };

    const addImage = (file) => {
        setNewImages((images) => [
            ...images,
            {
                image: file,
                description: ""
            }
        ]);
        setDataChanged(true);
    };

    // Handle form submission to update shelter data and avatar
    function handleSubmit(e) {
        e.preventDefault();
        if (dataChanged) {
            axiosInstance.put("/api/shelters/update/", {
                ...shelterData,
                address: address,
            })
            .then((res) => {
                for (const image of newImages) {
                    axiosInstance.postForm("/api/shelters/upload-image/", image)
                    .catch((error) => {
                        alert("Error uploading photo:", error.message);
                    });
                }
                alert("Data saved!");
                setDataChanged(false);
                window.location.reload();
            })
            .catch((err) => {
                alert("An error occurred during update");
                console.error(err.message);
            });
        }
        if (avatarChanged) {
            axiosInstance.put("/api/shelters/upload-profilepic/", {profile_pic: avatar}, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                setAvatarChanged(false);
                window.location.reload();
            })
            .catch((err) => {
                alert("An error occurred during update");
                console.error(err.message);
            });
        }
    }

    return (
        <form className="shelteredit-container">
            <div className="shelteredit-profile">
                {/* Image upload component for profile picture */}
                <ImageUpload initImage={avatar} onChange={(file) => {setAvatar(file); setAvatarChanged(true);}} />
                <div className="shelteredit-profile-desc">
                    {/* Input field for shelter name */}
                    <InputField value={shelterData.name} placeholder="Name" onChange={(e) => {setParticularData("name", e.target.value);}} />
                    {/* Textarea for shelter description */}
                    <textarea className="shelteredit-description" value={shelterData.description} placeholder="Description" onChange={(e) => {setParticularData("description", e.target.value);}} />
                </div>
            </div>
            <hr />
            <div className="shelteredit-gallery">
                <h2>Photos &amp; videos</h2>
                <p><MediaUploadSection initMediaArr={initShelterData.images} onChange={addImage} /></p>
            </div>
            <hr />
            <div className="shelteredit-contact">
                <div className="shelteredit-contact-item address">
                    <img className="contact-icon" src={Location} alt="location icon" />
                    <div className="shelteredit-address">
                        {/* Address component */}
                        <Address label={false} initAddress={address} setAddress={(param) => {setAddress(param); setDataChanged(true);}} />
                        {/* Country selection field */}
                        <CountrySelectionField label={false} initCountry={shelterData.country} setCountry={setCountry} />
                    </div>
                </div>
                {/* Contact email input field */}
                <div className="shelteredit-contact-item">
                    <img className="contact-icon" src={Email} alt="email icon" />
                    <InputField type="email" value={shelterData.contact_email} placeholder="Contact email" onChange={(e) => {setParticularData("contact_email", e.target.value);}} />
                </div>
                {/* Phone number input field */}
                <div className="shelteredit-contact-item">
                    <img className="contact-icon" src={Phone} alt="phone icon" />
                    <InputField type="tel" value={shelterData.phone_number} placeholder="Phone number" onChange={(e) => {setParticularData("phone_number", e.target.value);}} />
                </div>
            </div>
            {/* Show save button only if data or avatar has changed */}
            {(dataChanged || avatarChanged) && <button type="submit" className="btn-primary floating--bottom-right" onClick={handleSubmit}>Save</button>}
        </form>
    );
}
