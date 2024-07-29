import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { ImageUpload } from "../ui/ImageUpload";
import { MediaUploadSection } from "./MediaUploadSection";

export function PetEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [petData, setPetData] = useState({
        name: "",
        avatar: null,
        description: "",
        type: "",
        breed: "",
        age: "",
    });
    const [images, setImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [changed, setChanged] = useState(false);
    const [avatarChanged, setAvatarChanged] = useState(false);

    useEffect(() => {
        axiosInstance.get(`/api/pets/detail/${id}`)
        .then((res) => {
            setPetData(res.data);
            setImages(res.data.images);
            setLoading(false);
        })
        .catch((error) => {
            alert("An error occured.");
            console.log(error);
            navigate("/shelter/dashboard/list");
        });
    }, [id])

    const handleFormDataChange = (name, value) => {
        setPetData((data) => ({
            ...data,
            [name]: value
        }));
        setChanged(true);
    };

    // Handle changes to the avatar image
    const handleAvatarChange = (file) => {
        setPetData((data) => ({
            ...data,
            avatar: file
        }));
        setAvatarChanged(true);
        setChanged(true);
    };

    // Add a new image to the images array
    const addImage = (file) => {
        setNewImages((images) => [
            ...images,
            {
                image: file,
                description: ""
            }
        ]);
        setChanged(true);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!avatarChanged) {
            delete petData.avatar;
        }
        axiosInstance.put(`/api/pets/update/${id}`, petData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => {
            for (const image of newImages) {
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
            alert("Error:", error.message);
            console.log(error);
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        handleFormDataChange(name, value);
    };

    if (loading) return (<p>loading...</p>);

    return (
        <form className="create-form">
            <div className="listing_section">
                <ImageUpload onChange={handleAvatarChange} initImage={petData.avatar} />
                <div className="particular_section">
                    <input
                        name="name"
                        type="text"
                        placeholder="name"
                        defaultValue={petData.name}
                        onChange={handleChange}
                    />
                    <textarea
                        className="textsec"
                        name="description"
                        placeholder="Write a short description of this lovely animal!"
                        defaultValue={petData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
            </div>
            <div className="field_section">
                <div className="each_field_section">
                    <label htmlFor="age">Age:</label>
                    <input
                        className="age"
                        placeholder="Age"
                        id="age"
                        name="age"
                        type="number"
                        defaultValue={petData.age}
                        onChange={handleChange}
                    />
                </div>
                <div className="each_field_section">
                    <label>Type:</label>
                    <select
                        className="typefield"
                        id="type"
                        name="type"
                        onChange={handleChange}
                        defaultValue={petData.type}
                    >
                        <option value="">Select Type</option>
                        <option value="DOG">Dog</option>
                        <option value="CAT">Cat</option>
                        <option value="PARROT">Parrot</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                <div className="each_field_section">
                    <label>Breed:</label>
                    <input
                        className="breed"
                        placeholder="Breed"
                        id="breed"
                        name="breed"
                        type="text"
                        onChange={handleChange}
                        defaultValue={petData.breed}
                    />
                </div>
            </div>
            <hr />
            <div className="particular_section2">
                <h1>Photos & videos</h1>
                <MediaUploadSection onChange={addImage} initMediaArr={images} />
            </div>
            {changed && <button className={"done-button"} name={"Done"} type="submit" onClick={handleSubmit}>Save</button>}
        </form>
    );
}