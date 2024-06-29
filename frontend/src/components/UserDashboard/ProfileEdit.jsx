import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { UserContext } from "../../utils/contexts/UserContext";
import { ImageUpload } from "../ui/ImageUpload";
import { InputField } from "../ui/InputField";
import { CountrySelectionField } from "../ui/CountrySelectionField";
import { Address } from "../ui/Address";


export function ProfileEdit() {
    useEffect(() => {
        document.title = "Edit Profile";
    }, [])

    const [dataChanged, setDataChanged] = useState(false);
    const [avatarChanged, setAvatarChanged] = useState(false);
    const initUserData = useContext(UserContext);
    const [userData, setUserData] = useState({
        display_name: initUserData.display_name,
        country: initUserData.country,
    });
    const [address, setAddress] = useState(initUserData.address)
    const [avatar, setAvatar] = useState(initUserData.profile_pic);

    // TODO: handle submit, add save button, style this shit

    const setCountry = (value) => {
        setUserData((data) => ({
            ...data,
            country: value,
        }));
        setAddress((addr) => ({
            ...addr,
            country: value,
        }))
        setDataChanged(true);
    }

    const setName = (value) => {
        setUserData((data) => ({
            ...data,
            display_name: value,
        }));
        setDataChanged(true);
    }

    const handleAvatarChange = (file) => {
        setAvatarChanged(true);
        setAvatar(file);
    };

    const handleSubmit = (e) => {
        if (dataChanged) {
            axiosInstance.put("/api/users/update/", {
                ...userData,
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
            axiosInstance.put("/api/users/upload-profilepic/", {profile_pic: avatar}, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                alert("profile pic updated")
                setAvatarChanged(false);
            })
            .catch((err) => {
                alert("An error occured during update");
                console.error(err.message);
            });
        }
    };

    return (
        <form className="profile-edit-container">
            <div className="profile-edit-desc">
                <ImageUpload initImage={avatar} onChange={handleAvatarChange} />
                <InputField value={userData.display_name} placeholder="Display name" label="Display name:" id="displayname" linebreak onChange={(e) => {setName(e.target.value)}} />
            </div>
            <hr />
            <div className="profile-edit-location">
                <h2>Location</h2>
                <CountrySelectionField initCountry={userData.country ? userData.country : ""} setCountry={setCountry} />
                <Address initAddress={address} setAddress={(param) => {
                    setAddress(param);
                    setDataChanged(true);
                }} />
            </div>
            {(dataChanged || avatarChanged) && <button type="submit" className="btn-primary floating--bottom-right" onClick={handleSubmit}>Save</button>}
        </form>
    );
}