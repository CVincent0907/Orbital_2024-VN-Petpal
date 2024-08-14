import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { UserContext } from "../../utils/contexts/UserContext";
import { Address } from "../ui/Address";
import { CountrySelectionField } from "../ui/CountrySelectionField";
import { ImageUpload } from "../ui/ImageUpload";
import { InputField } from "../ui/InputField";

export function ProfileEdit() {
    // Set the document title when the component mounts
    useEffect(() => {
        document.title = "Edit Profile";
    }, [])

    // State hooks for managing form data and changes
    const [dataChanged, setDataChanged] = useState(false);
    const [avatarChanged, setAvatarChanged] = useState(false);
    
    // Retrieve initial user data from context
    const initUserData = useContext(UserContext);
    
    // State hooks for user data, address, and avatar
    const [userData, setUserData] = useState({
        display_name: initUserData.display_name,
        country: initUserData.country,
    });
    const [address, setAddress] = useState(initUserData.address);
    const [avatar, setAvatar] = useState(initUserData.profile_pic);

    // Update country in userData and address state, mark data as changed
    const setCountry = (value) => {
        setUserData((data) => ({
            ...data,
            country: value,
        }));
        setAddress((addr) => ({
            ...addr,
            country: value,
        }));
        setDataChanged(true);
    }

    // Update display name in userData state, mark data as changed
    const setName = (value) => {
        setUserData((data) => ({
            ...data,
            display_name: value,
        }));
        setDataChanged(true);
    }

    // Handle file change for avatar upload
    const handleAvatarChange = (file) => {
        setAvatarChanged(true);
        setAvatar(file);
    };

    // Handle form submission for saving changes
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        let promise = Promise.resolve();
        
        // Update user data if changes were made
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
                alert("An error occurred during update");
                console.error(err.message);
            });
        }

        // Update avatar if changes were made
        if (avatarChanged) {
            promise = axiosInstance.put("/api/users/upload-profilepic/", {profile_pic: avatar}, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .catch((err) => {
                alert("An error occurred during update");
                console.error(err.message);
            });
        }

        promise.then(() => window.location.reload());
    };

    return (
        <form className="profile-edit-container">
            <div className="profile-edit-desc">
                {/* Component for uploading and displaying profile image */}
                <ImageUpload initImage={avatar} onChange={handleAvatarChange} />
                {/* Input field for display name */}
                <InputField 
                    value={userData.display_name} 
                    placeholder="Display name" 
                    label="Display name:" 
                    id="displayname" 
                    linebreak 
                    onChange={(e) => {setName(e.target.value)}} 
                />
            </div>
            <hr />
            <div className="profile-edit-location">
                <h2>Location</h2>
                {/* Component for selecting country */}
                <CountrySelectionField initCountry={userData.country} setCountry={setCountry} />
                {/* Component for entering address */}
                <Address 
                    initAddress={address} 
                    setAddress={(param) => {
                        setAddress(param);
                        setDataChanged(true);
                    }} 
                />
                {(!dataChanged && (!address || !address.is_valid)) && <p>*Location based sorting disabled. Address is invalid OR service is down.</p>}
                {(!dataChanged && (address && address.is_valid)) && <p>*Your address is being used to sort shelters and pets by location.</p>}
            </div>
            <p className="account-id">id: @{initUserData.account.account_id}</p>
            {/* Save button shown only if there are changes */}
            {(dataChanged || avatarChanged) && 
                <button 
                    type="submit" 
                    className="btn-primary floating--bottom-right" 
                    onClick={handleSubmit}
                >
                    Save
                </button>
            }
        </form>
    );
}
