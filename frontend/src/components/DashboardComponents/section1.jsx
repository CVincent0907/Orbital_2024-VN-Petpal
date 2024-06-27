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
import axiosInstance from "../../utils/axiosInstance";
import Button from "../User&ShelterRegisterLoginComponents/Button";
import Particular_section1 from "./Particular_section1";
import Particular_section2 from "./Particular_section2";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";


export default function Section1() {
    const navigate = useNavigate();
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

    const handleMediaChange = (file) => {
        setImages((images) => {
            images.push({
                image: file,
                description: "",
            });
            return images;
        });
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
            <div>
                <Particular_section1 onChange={handleFormDataChange} onProfilePhotoChange={handleAvatarChange} />
                <hr className="particular_divider" />
                <Particular_section2 onChange={handleMediaChange} />
                <div className="button-section1">
                    <Button className={"done-button"} name={"Done"} type="submit" onClick={handleSubmit}/>
                </div>
            </div>
        </form>
    );
}
