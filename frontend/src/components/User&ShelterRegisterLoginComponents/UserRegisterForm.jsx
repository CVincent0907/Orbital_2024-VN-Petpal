import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

import RegisterForm1 from "./UserRegisterForm1";
import RegisterForm2 from "./UserRegisterForm2";

export default function UserRegisterForm() {
    // Hook to navigate programmatically
    const navigate = useNavigate();
    
    // State to manage user data
    const [userData, setUserData] = useState({
        display_name: "",
        country: "",
    });
    
    // State to manage account details
    const [account, setAccount] = useState({
        email: "",
        role: "USER",
        password: "",
    });
    
    // State to manage address
    const [address, setAddress] = useState(null);

    // Function to post data to the server
    const postData = async () => {
        axiosInstance.post('api/auth/register/user/', {
            account: account,
            ...userData,
            address: address
        }).then((res) => {
            alert("Your account has been successfully created!");
            axiosInstance.post('api/auth/login/', account)
            .then((res) => {
                // TODO: handle data returned by storing it in a context
                navigate('/dashboard');
            }).catch((error) => {
                console.log(error);
                alert("There was an error during login: " + error.Message);
                navigate('/login');
            })
        }).catch((error) => {
            console.error("There was an error completing the registration!", error);
            alert("Registration failed. Please try again. Message: " + error.message);
        })
    };

    // State to manage form index (for multi-step form navigation)
    const [index, setIndex] = useState(1);
    
    // Function to go to the next form step
    function next() {
        setIndex((curr) => curr + 1);
    }
    
    // Function to go back to the previous form step
    function back() {
        setIndex((curr) => curr - 1);
    }

    // Render different form components based on the current step index
    switch(index) {
        case 1:
            return <RegisterForm1 handleSubmit={next} setData={setAccount} />
        case 2:
            return <RegisterForm2 goBack={back} handleSubmit={postData} setData={setUserData} setAddress={setAddress} />;
    }
}
