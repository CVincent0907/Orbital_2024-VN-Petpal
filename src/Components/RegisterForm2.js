import axios from "axios"; // Don't forget to import axios
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Address from "./Address";
import Button from "./Button";
import Country from "./Country";
import Phone from "./Phone";

export default function RegisterForm2(props) {
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

        if (
            country &&
            address &&
            postcode &&
            city &&
            state &&
            countryCode &&
            phone
        ) {
            try {
                const response = await axios.post('http://localhost:8000/api/register_step_three/', {
                    user_id: props.userId,
                    country: country,
                    street_required: address,
                    street_optional: optionalAddress,
                    postcode: postcode,
                    city: city,
                    state: state,
                    country_code: countryCode,
                    phone_number: phone
                });
                if (response.status === 200) {
                    alert("Your account has been successfully created!");
                    navigate('/dashboard');
                }
            } catch (error) {
                console.error("There was an error completing the registration!", error);
                alert("Registration failed. Please try again. Message: " + error.message);
            }
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
            <Button className="next-button" name="Submit"/>
            </form>
        </section>
        </div>
    )
}