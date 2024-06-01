import React, { useState } from "react";
import Button from "./Button";
import InputField from "./InputField";

export default function RegisterForm2(props) {
    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [ContactEmail, setContactEmail] = useState("");

    const goToNextPage = async (e) => {
        e.preventDefault();
        if (Name === "") {
            alert("Please enter a name.");
            return;
        }
        props.setName(Name);
        props.setDesc(Description);
        props.setContactEmail(ContactEmail);
        props.next();
    };
    
    return (
        <div>
            <section className="RegisterFormSection">
                <form className="registerForm" >
                    <InputField type="text" placeholder="Name" id="Name" name="Name" autoFocus={true} change={(e) => setName(e.target.value)}/>
                    <label className="input-field-name">Description:</label>
                    <br/>
                    <textarea className="description-area" placeholder="Enter a short description of your animal shelter" 
                        id="description" name="description" rows="10" cols="50" onChange={(e) => setDescription(e.target.value)}></textarea>
                    <br/>
                    <br/>
                    <label className="input-field-name">Contact email:</label>
                    <input type="email" placeholder="Email" id="contact-email" name="Contact email" autoFocus={false} onChange={(e) => setContactEmail(e.target.value)}/>
                    <Button className="next-button" name="Next" onClick = {goToNextPage} />
                </form>
            </section>
        </div>
    );
}
