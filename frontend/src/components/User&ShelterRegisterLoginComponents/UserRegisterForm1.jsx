import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import Button from "./Button";
import InputField from "./InputField";

export default function UserRegisterForm1({ handleSubmit, setData }) {
    const emailre = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [CPassword, setCPassword] = useState("");

    const goToNextPage = async (e) => {
        e.preventDefault();
        if (Email === "" || Password === "" || CPassword === "") {
            alert("Please fill in all fields.");
            return;
        }
        if (!emailre.test(Email)) {
            alert("Please enter a valid email address.");
            return;
        }
        if (Password !== CPassword) {
            alert("Password do not match.");
            return;
        }
        
        axiosInstance.get('/api/auth/is-available/USER/' + Email, {
            withCredentials: false
        })
        .then((res) => {
            if (res.data.is_available) {
                setData((data) => ({
                    ...data,
                    email: Email,
                    password: Password
                }));
                handleSubmit();
            } else {
                alert("This email already has a registered account.");
                return;
            }
        }).catch((error) => {
            console.error("There was an error registering the user!", error);
            alert("Registration failed. Please try again. Message: " + error.message);
        });
    };
    

    return (
        <div>
            <section className="RegisterFormSection">
                <form className="registerForm">
                    <InputField type="email" placeholder="Email" id="email" name="Email" autoFocus={false} required={true} change={(e) => setEmail(e.target.value)}/>
                    <InputField type="password" placeholder="Password" id="password" name="Password" autoFocus={false} required={true} change={(e) => setPassword(e.target.value)}/>
                    <label className="input-field-name" htmlFor="confirm-password">Confirm password:</label>
                    <input type="password" placeholder="Password" id="confirm-password" name="Confirm password" required onChange={(e) => setCPassword(e.target.value)}/>
                    <div>
                        <Button className="next-button" name="Next" onClick={goToNextPage} />
                    </div>
                </form>
            </section>
        </div>
    )
}
