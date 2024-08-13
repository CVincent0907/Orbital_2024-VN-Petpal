import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

import RegisterForm1 from './ShelterRegisterForm1';
import RegisterForm2 from './ShelterRegisterForm2';
import RegisterForm3 from './ShelterRegisterForm3';

export default function ShelterRegisterForm() {
    const navigate = useNavigate(); // Hook for navigation
    const [shelterData, setShelterData] = useState({
        name: "",
        description: "",
        contact_email: "",
        country: "",
        phone_number: "",
    });

    const [account, setAccount] = useState({
        email: "",
        role: "SHELTER", // Default role for shelter registration
        password: "",
    });

    /* {
        address_line_1: "",
        address_line_2: "",
        postcode: "",
        city: "",
        state: "",
        country: "",
    } */
    const [address, setAddress] = useState(null);

    // Function to post registration and login data
    const [post, setPost] = useState(true);
    const isMounted = useRef(false);
    useEffect(() => {
        if (isMounted.current) {
            axiosInstance.post('api/auth/register/shelter/', {
                account: account,
                ...shelterData,
                address: address
            }).then((res) => {
                alert("Your account has been successfully created!");
                // Attempt to log in with the newly created account
                axiosInstance.post('api/auth/login/', account)
                .then((res) => {
                    // TODO: handle data returned by storing it in a context
                    navigate('/shelter/dashboard/list'); // Redirect to shelter dashboard
                }).catch((error) => {
                    console.log(error);
                    alert("There was an error during login: " + error.message); // Note: corrected error.Message to error.message
                    navigate('/shelter/login'); // Redirect to login page on error
                })
            }).catch((error) => {
                console.error("There was an error completing the registration!", error);
                // alert("Registration failed. Please try again. Message: " + error.message);
            });
        }
        isMounted.current = true;
    }, [post])

    const [index, setIndex] = useState(1); // State for tracking the current step in the multi-step form

    // Function to move to the next form step
    function next() {
        setIndex((curr) => curr + 1);
    }

    // Render different form components based on the current step
    switch(index) {
        case 1:
            return <RegisterForm1 handleSubmit={next} setData={setAccount} />;
        case 2:
            return <RegisterForm2 handleSubmit={next} setData={setShelterData} />;
        case 3:
            return <RegisterForm3 handleSubmit={() => setPost(val => !val)} setData={setShelterData} setAddress={setAddress} />;
    }
}
