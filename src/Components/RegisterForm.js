import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import InputField from "./InputField";

export default function RegisterForm() {
    const navigate = useNavigate();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [CPassword, setCPassword] = useState("");

    const goToNextPage = async (e) => {
        e.preventDefault();
        if (Email === "" || Password === "" || CPassword === "") {
            alert("Please fill in all fields.");
            return;
        } else if (Password !== CPassword) {
            alert("Password do not match.");
            return;
        }

        const formData = new FormData();
        formData.append('email', Email);
        formData.append('password', Password);

        try {
            const response = await axios.post('http://localhost:8000/api/step-one/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                navigate('/registerPage1');
            } else {
                alert("Registration failed. Please try again.");
            }
        } catch (error) {
           // Inside the catch block
            alert("Registration failed. Please try again. Error: " + error.message);
        }
    };

    return (
        <div>
            <section className="RegisterFormSection">
                <form className="registerForm">
                    <InputField type="email" placeholder="Email" id="email" name="Email" autoFocus={true} change={(e) => setEmail(e.target.value)}/>
                    <InputField type="password" placeholder="Password" id="password" name="Password" autoFocus={false} change={(e) => setPassword(e.target.value)}/>
                    <label className="input-field-name" htmlFor="confirm-password">Confirm password:</label>
                    <input type="password" placeholder="Password" id="confirm-password" name="Confirm password"  onChange={(e) => setCPassword(e.target.value)}/>
                    <Button className="next-button" name="Next" onClick = {goToNextPage} />
                </form>
            </section>
        </div>
    )
}
