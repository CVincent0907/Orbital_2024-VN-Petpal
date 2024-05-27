import axios from "axios"; // Don't forget to import axios
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Button from "./Button";
import InputField from "./InputField";

export default function RegisterForm1() {
    const navigate = useNavigate();
    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [ContactEmail, setContactEmail] = useState("");

    const goToNextPage = async (e) => {
        e.preventDefault();
        if (Name === "" || Description === "" || ContactEmail === "") {
            alert("Please fill in all fields.");
            return;
        } 
           
            const formData = new FormData();
            formData.append('name', Name);
            formData.append('description', Description);
            formData.append('contact_email', ContactEmail);
            
            try {
                const response = await axios.post('http://localhost:8000/api/step-two/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.status === 200) {
                    navigate("/registerPage2");
                } else {
                    alert("Failed to proceed to the next step. Please try again.");
                }
            } catch (error) {
                alert("Registration failed. Please try again. Error: " + error.message);
                
            }
        }

    return (
        <div>
            <section className="RegisterFormSection">
                <form className="registerForm" >
                    <InputField type="text" placeholder="Name" id="Name" name="Name" autoFocus={true} change={(e) => setName(e.target.value)}/>
                    <label className="input-field-name">Description:</label>
                    <br/>
                    <textarea className="description-area" placeholder="Enter a short description of your animal shelter" 
                        id="description" name="description" rows="10" cols="50" onChange={(e) => setDescription(e.target.value)} required></textarea>
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
