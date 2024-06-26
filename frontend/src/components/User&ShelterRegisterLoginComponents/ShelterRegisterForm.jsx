import axiosInstance from '../../utils/axiosInstance';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import RegisterForm1 from './ShelterRegisterForm1';
import RegisterForm2 from './ShelterRegisterForm2';
import RegisterForm3 from './ShelterRegisterForm3';


export default function ShelterRegisterForm(props) {
    const navigate = useNavigate()
    const [shelterData, setShelterData] = useState({
        name: "",
        description: "",
        contact_email: "",
        country: "",
        phone_number: "",
    })
    const [account, setAccount] = useState({
        email: "",
        role: "SHELTER",
        password: "",
    })
    const [address, setAddress] = useState({
        unit_number: "",
        street_name: "",
        address_line_1: "",
        address_line_2: "",
        region: "",
        postcode: "",
        city: "",
        state: "",
        country: "",
    })
    
    // Post data to register endpoint of api, then attempt to login
    const postData = async () => {
        axiosInstance.post('api/auth/register/shelter/', {
            account: account,
            ...shelterData,
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
                navigate('/shelter/login');
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

    switch(index) {
        case 1:
            return <RegisterForm1 handleSubmit={next} setData={setAccount} />;
        case 2:
            return <RegisterForm2 handleSubmit={next} setData={setShelterData} />;
        case 3:
            return <RegisterForm3 handleSubmit={postData} setData={setShelterData} setAddress={setAddress} />;
    }
}