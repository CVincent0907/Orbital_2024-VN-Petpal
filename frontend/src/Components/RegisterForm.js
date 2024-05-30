import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import InputField from "./InputField";

export default function RegisterForm(props) {
    const navigate = useNavigate();
    const [Email, setEmail] = useState(null);
    const [Password, setPassword] = useState(null);
    const [CPassword, setCPassword] = useState(null);

    const goToNextPage = async (e) => {
        e.preventDefault();
        if (Email === "" || Password === "" || CPassword === "") {
            alert("Please fill in all fields.");
            return;
        } else if (Password !== CPassword) {
            alert("Password do not match.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/register_step_one/', { 
                email: Email, // Use 'email' instead of 'Email'
                password: Password // Use 'password' instead of 'Password'
            });
            if (response.status === 201) {
                props.setUserId(response.data.user_id);
                navigate('/registerPage1');
            }
        } catch (error) {
            console.error("There was an error registering the user!", error);
            alert("Registration failed. Please try again. Message: " + error.message);
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
