// import React from "react";
// import Button from "../User&ShelterRegisterLoginComponents/Button";
// import Particular_section1 from "./Particular_section1";
// import Particular_section2 from "./Particular_section2";
// import "./dashboard.css";


// export default function Section1() {
   

//     return (
//         <div>
//            <Particular_section1/>
//            <hr className="particular_divider"/>
//            <Particular_section2/>
//            <div className="button-section1">
//                 {/* Yet to add onClick to the button */}
//                 <Button className={"done-button"} name={"Done"}></Button>
//            </div>
//         </div>
//     )
// }


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../User&ShelterRegisterLoginComponents/Button";
import Particular_section1 from "./Particular_section1";
import Particular_section2 from "./Particular_section2";
import "./dashboard.css";


export default function Section1() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        age: "",
        type: "",
        breed: "",
        profilePhoto: null,
        media: null
    });

    const handleFormDataChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleProfilePhotoChange = (file) => {
        setFormData({
            ...formData,
            profilePhoto: file
        });
    };

    const handleMediaChange = (file) => {
        setFormData({
            ...formData,
            media: file
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            alert("No authentication token found");
            return;
        }

        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("age", formData.age);
        data.append("type", formData.type);
        data.append("breed", formData.breed);
        if (formData.profilePhoto) {
            data.append("profilePhoto", formData.profilePhoto);
        }
        if (formData.media) {
            data.append("media", formData.media);
        }
    
        try {
            
            const response = await axios.post(
                "http://127.0.0.1:8000/pets/create/",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
            alert("Pet created successfully:", response.data);
        } catch (error) {
            alert("Error creating pet:", error.response);
        }
        
    };

    return (
        <form className="create-form">
            <div>
                <Particular_section1 onChange={handleFormDataChange} onProfilePhotoChange={handleProfilePhotoChange} />
                <hr className="particular_divider" />
                <Particular_section2 onChange={handleMediaChange} />
                <div className="button-section1">
                    <Button className={"done-button"} name={"Done"} type="submit" onClick={handleSubmit}/>
                </div>
            </div>
        </form>
    );
}
