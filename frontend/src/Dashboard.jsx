import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:8000';

export default function Dashboard() {
    const [name, setName] = useState("<name>")

    useEffect(() => {
        const response = axios.get("/api/user/")
        .then((res) => {
            setName(res.data.user.name);
        })
        .catch((error) => {
            alert("Error: " + error.Message)
            console.log(error)
        })
    }, []);

    return (
        <>
            <h1>Dashboard</h1>
            <h2>{name}</h2>
        </>
    )
}