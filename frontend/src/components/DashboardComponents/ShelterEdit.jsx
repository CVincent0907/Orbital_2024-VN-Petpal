import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { ShelterContext } from "../../utils/contexts/ShelterContext";
import { ImageUpload } from "../ui/ImageUpload";
import { InputField } from "../ui/InputField";
import { CountrySelectionField } from "../ui/CountrySelectionField";
import { Address } from "../ui/Address";

import Email from "../../assets/icons/email.svg";
import Link from "../../assets/icons/link.svg";
import Location from "../../assets/icons/location.svg";
import Phone from "../../assets/icons/phone.svg";


export function ShelterEdit() {
    useEffect(() => {
        document.title = "Edit Profile";
    }, []);
    const [dataChanged, setDataChanged] = useState(false);
    const [avatarChanged, setAvatarChanged] = useState(false);
    const initShelterData = useContext(ShelterContext);
    const [shelterData, setShelterData] = useState({
        name: initShelterData.name,
        description: initShelterData.description,
        contact_email: initShelterData.contact_email,
        country: initShelterData.country,
        phone_number: initShelterData.phone_number,
    });
    // const [images, setImages] = useState(initShelterData.images);
    const [address, setAddress] = useState(initShelterData.address);
    const [avatar, setAvatar] = useState(initShelterData.profile_pic);

    const setParticularData = (name, value) => {
        setShelterData((data) => ({
            ...data,
            [name]: value,
        }));
        setDataChanged(true);
    };

    const setCountry = (value) => {
        setShelterData((data) => ({
            ...data,
            country: value,
        }));
        setAddress((addr) => ({
            ...addr,
            country: value,
        }))
        setDataChanged(true);
    }

    function handleSubmit() {
        if (dataChanged) {
            axiosInstance.put("/api/shelters/update/", {
                ...shelterData,
                address: address,
            })
            .then((res) => {
                alert("Data saved!");
                setDataChanged(false);
            })
            .catch((err) => {
                alert("An error occured during update");
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
                alert("profile pic updated");
                setAvatarChanged(false);
            })
            .catch((err) => {
                alert("An error occured during update");
                console.error(err.message);
            });
        }
    }

    return (
        <form className="shelteredit-container">
            <div className="shelteredit-profile">
                <ImageUpload initImage={avatar} onChange={(file) => {setAvatar(file); setAvatarChanged(true);}} />
                <div className="shelteredit-profile-desc">
                    <InputField value={shelterData.name} placeholder="Name" onChange={(e) => {setParticularData("name", e.target.value);}} />
                    <textarea className="shelteredit-description" value={shelterData.description} placeholder="Description" onChange={(e) => {setParticularData("description", e.target.value);}} />
                </div>
            </div>
            <hr />
            <div className="shelteredit-gallery">
                <h2>Photos &amp; videos</h2>
                <p>This feature is temporarily disabled due to having too many bugs 😓</p>
            </div>
            <hr />
            <div className="shelteredit-contact">
                <div className="shelteredit-contact-item address">
                    <img className="contact-icon" src={Location} alt="location icon" />
                    <div className="shelteredit-address">
                        <Address label={false} initAddress={address} setAddress={(param) => {setAddress(param); setDataChanged(true);}} />
                        <CountrySelectionField label={false} initCountry={shelterData.country} setCountry={setCountry} />
                    </div>
                </div>
                {/* <div className="shelteredit-contact-item">
                    <img className="contact-icon" src={Link} alt="web-link icon" />
                    <InputField value={shelterData.link} placeholder="Link" onChange={(e) => {setParticularData("link", e.target.value);}} />
                </div> */}
                <div className="shelteredit-contact-item">
                    <img className="contact-icon" src={Email} alt="email icon" />
                    <InputField type="email" value={shelterData.contact_email} placeholder="Contact email" onChange={(e) => {setParticularData("contact_email", e.target.value);}} />
                </div>
                <div className="shelteredit-contact-item">
                    <img className="contact-icon" src={Phone} alt="phone icon" />
                    <InputField type="tel" value={shelterData.phone_number} placeholder="Phone number" onChange={(e) => {setParticularData("phone_number", e.target.value);}} />
                </div>
            </div>
            {(dataChanged || avatarChanged) && <button type="submit" className="btn-primary floating--bottom-right" onClick={handleSubmit}>Save</button>}
        </form>
    );
}