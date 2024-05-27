import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Address from "./Address";
import Button from "./Button";
import Country from "./Country";
import Phone from "./Phone";

export default function RegisterForm2() {
    const navigate = useNavigate();

    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [optionalAddress, setOptionalAddress] = useState("");
    const [postcode, setPostcode] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            country && 
            address &&
            postcode &&
            city &&
            state &&
            countryCode &&
            phone
        ) {
            // Navigate to the dashboard
            navigate('/dashboard');
            alert("Your account has been succesfully created !")
        } else {
            alert("Please fill in all required fields.");
        }
    };

    return (
        <div>
        <section className="RegisterFormSection">
            <form className="registerForm" onSubmit={handleSubmit}>
            <Country country={setCountry}/>
            <Address address={setAddress} optional={setOptionalAddress} postcode={setPostcode} city={setCity} state={setState}/>
            <Phone code={setCountryCode} phone={setPhone}/>
            <Button className="next-button" name="Submit" onClick={handleSubmit}/>
            </form>
        </section>
        </div>
    )
}