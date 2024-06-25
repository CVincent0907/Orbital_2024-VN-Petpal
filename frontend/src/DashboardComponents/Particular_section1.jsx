import React from "react";
import edit from "./DashboardIcon/edit_icon.svg";
import PhotoUpload from "./PhotoUpload";

export default function Particular_section1() {
    return (
        <>
             <div className="listing_section">
                 <PhotoUpload/>
                <div className="particular_section">
                    <div>
                    <input id="Name" name="Name" type="text" placeholder="name"></input>
                    <img src={edit} alt="edit"></img>
                    </div>
                    <textarea className="textsec" placeholder="Write a short description of this lovely animal!✏️ "></textarea>
                </div>
            </div>
            <div className="field_section">
                <div className="each_field_section">
                    <label for="age">Age:</label>
                    <input className="age" placeholder="Age" id="age" name="age" type="number"></input>
                </div>
                <div className="each_field_section">
                    <label>Type:</label>
                    <select className="typefield" id="type" name="type" type="number">
                        <option className="type_option" value="type">Type</option>
                    </select>
                </div>
                <div className="each_field_section">
                    <label>Breed:</label>
                    <input className="breed" placeholder="Breed" id="breed" name="breed" type="text"></input>
                </div>
            </div>
        </>
    )
}