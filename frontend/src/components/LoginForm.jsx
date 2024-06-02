// Login.js
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Facebook from "../assets/Facebook icon (1).png";
import Google from "../assets/Google icon.png";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:8000';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            alert("Please fill in both email and password fields.");
            return;
        }

        // try {
        //     const response = await axios.post('http://localhost:8000/api/login/', { 
        //         email, 
        //         password 
        //     }, {
        //         headers: {
        //             'X-CSRFToken': getCSRFToken()
        //         }
        //     });
        //     if (response.data.success) {
        //         navigate("/dashboard");
        //     } else {
        //         alert(response.data.message);
        //     }
        // } catch (error) {
        //     console.error("There was an error logging in!", error);
        //     alert("Login failed. Please try again. Message: " + error.message);
        // }
        axios.post('/api/login/', {
            email: email,
            password: password
        }).then((res) => {
            navigate('/dashboard');
        }).catch((error) => {
            alert("Error: " + error.message);
            console.log(error);
        });
    };

    return (
        <div>
            <section className="formSection">
                <form className="form" onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" id="email" name="email" autoComplete="on" onChange={(e) => setEmail(e.target.value)}autoFocus/>
                    <br/><br/><br/>
                    <input type="password" placeholder="Password" id="password" name="password"   onChange={(e) => setPassword(e.target.value)}/>
                    <h4 className="forgotPw">Forgot password?</h4>
                    <br/><br/><br/>
                    <button className="loginButton" type="submit">Log in</button>
                    <br/><br/><br/>
                    <h4 className="alternative">or continue with</h4>
                    <button className="button" type="submit">
                        <img className="icon" src={Google} alt="Google Icon" />
                        Google
                    </button>
                    <br/><br/><br/>
                    <button className="button" type="submit">
                        <img className="icon" src={Facebook} alt="Facebook Icon" />
                        Facebook
                    </button>
                </form>
            </section>
        </div>
    );
}

function getCSRFToken() {
    let csrfToken = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, 10) === 'csrftoken=') {
                csrfToken = decodeURIComponent(cookie.substring(10));
                break;
            }
        }
    }
    return csrfToken;
}
