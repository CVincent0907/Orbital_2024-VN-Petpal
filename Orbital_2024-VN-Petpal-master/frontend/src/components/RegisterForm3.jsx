import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

import Address from "./Address";
import Button from "./Button";
import Country from "./Country";
import Phone from "./Phone";

export default function RegisterForm3(props) {
    const navigate = useNavigate();

    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [optionalAddress, setOptionalAddress] = useState("");
    const [postcode, setPostcode] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!(country && address && postcode && city && state)) {
            alert("Please fill in all required fields.");
            return;
        }
        axiosInstance.post('api/register/', {
            email: props.email,
            password: props.password,
            name: props.name,
            description: props.desc,
            contact_email: props.contactEmail,

            country: country,
            street_1: address,
            street_2: optionalAddress,
            postcode: postcode,
            city: city,
            state: state,
            phone_number: phone
        }).then((res) => {
            alert("Your account has been successfully created!");
            axiosInstance.post('api/login/', {
                email: props.email,
                password: props.password
            }).then((res) => {
                navigate('/dashboard');
            }).catch((error) => {
                console.log(error);
                alert("There was an error during login: " + error.Message);
                navigate('/');
            })
        }).catch((error) => {
            console.error("There was an error completing the registration!", error);
            alert("Registration failed. Please try again. Message: " + error.message);
        })
    };

    return (
        <div>
        <section className="RegisterFormSection">
            <form className="registerForm" onSubmit={handleSubmit}>
            <Country country={setCountry}/>
            <Address address={setAddress} optional={setOptionalAddress} postcode={setPostcode} city={setCity} state={setState}/>
            <Phone code={setCountryCode} phone={setPhone}/>
            <Button className="next-button" name="Submit"/>
            </form>
        </section>
        </div>
    );
}