import React from "react";
import PhotoUpload from "./PhotoUpload";


export default function Particular_section1({ onChange, onProfilePhotoChange }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange(name, value);
    };

    return (
        <>
            <div className="listing_section">
                <PhotoUpload onChange={onProfilePhotoChange} />
                <div className="particular_section">
                    <input
                        name="name"
                        type="text"
                        placeholder="name"
                        onChange={handleChange}
                    />
                    <textarea
                        className="textsec"
                        name="description"
                        placeholder="Write a short description of this lovely animal!"
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
                    />
                </div>
            </div>
        </>
    );
}
