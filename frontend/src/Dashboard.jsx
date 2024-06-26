import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:8000';

export default function Dashboard() {
    const navigate = useNavigate();
    const [name, setName] = useState("<name>");
    const [email, setEmail] = useState("");

    useEffect(() => {
        document.title = "Dashboard";

        const response = axios.get("/api/user/")
        .then((res) => {
            setName(res.data.user.name);
            setEmail(res.data.user.email);
        })
        .catch((error) => {
            alert("Error: " + error.Message)
            console.log(error)
        })
    }, []);

    function logout() {
        axios.post("/api/logout/", {email: email})
        .then((res) => {
            navigate("/")
        }).catch((error) => {
            alert("Error: " + error.Message)
            console.log(error)
        });
    }

    function printCookies() {
        console.log(document.cookie);
    }

    return (
        <>
            <h1>{name}</h1>
            <button className="logout-button" onClick={logout}>logout</button>
        </>
    )
}
