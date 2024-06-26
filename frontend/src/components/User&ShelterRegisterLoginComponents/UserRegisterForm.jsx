import axiosInstance from '../../utils/axiosInstance';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import RegisterForm1 from "./UserRegisterForm1";
import RegisterForm2 from "./UserRegisterForm2";


export default function UserRegisterForm() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        display_name: "",
        country: "",
    });
    const [account, setAccount] = useState({
        email: "",
        role: "USER",
        password: "",
    });
    const [address, setAddress] = useState(null);
    //     unit_number: "",
    //     street_name: "",
    //     address_line_1: "",
    //     address_line_2: "",
    //     region: "",
    //     postcode: "",
    //     city: "",
    //     state: "",
    //     country: "",
    // }

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
    
    const [index, setIndex] = useState(1);
    function next() {
        setIndex((curr) => curr + 1);
    }
    function back() {
        setIndex((curr) => curr - 1);
    }

    switch(index) {
        case 1:
            return <RegisterForm1 handleSubmit={next} setData={setAccount} />
        case 2:
            return <RegisterForm2 goBack={back} handleSubmit={postData} setData={setUserData} setAddress={setAddress} />;
    }
}