import axios from "axios";
import React, { useState } from "react";

import Button from "./Button";
import InputField from "./InputField";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:8000';

export default function RegisterForm1(props) {
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

        const response = axios.get('/api/is-available/' + Email)
        .then((res) => {
            if (res.data.is_available) {
                props.setEmail(Email);
                props.setPassword(Password);
                props.next();
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
                    <InputField type="email" placeholder="Email" id="email" name="Email" autoFocus={false} change={(e) => setEmail(e.target.value)}/>
                    <InputField type="password" placeholder="Password" id="password" name="Password" autoFocus={false} change={(e) => setPassword(e.target.value)}/>
                    <label className="input-field-name" htmlFor="confirm-password">Confirm password:</label>
                    <input type="password" placeholder="Password" id="confirm-password" name="Confirm password"  onChange={(e) => setCPassword(e.target.value)}/>
                    <Button className="next-button" name="Next" onClick = {goToNextPage} />
                </form>
            </section>
        </div>
    )
}
