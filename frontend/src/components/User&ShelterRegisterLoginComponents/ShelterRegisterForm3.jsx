import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Address from "./Address";
import Button from "./Button";
import Country from "./Country";
import Phone from "./Phone";

export default function ShelterRegisterForm3({ handleSubmit, setData, setAddress }) {
    const navigate = useNavigate();

    const [country, setCountry] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [postcode, setPostcode] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [phone, setPhone] = useState("");

    const Submit = async (e) => {
        e.preventDefault();
        if (!(country && addressLine1 && postcode && city && state)) {
            alert("Please fill in all required fields.");
            return;
        }
        setData((data) => ({
            ...data,
            country: country,
            phone_number: phone,
        }));
        setAddress((address) => ({
            ...address,
            address_line_1: addressLine1,
            address_line_2: addressLine2,
            postcode: postcode,
            city: city,
            state: state,
            country: country,
        }));
        handleSubmit();
    };

    return (
        <div>
        <section className="RegisterFormSection">
            <form className="registerForm" onSubmit={Submit}>
            <Country country={setCountry}/>
            {/* TODO: change handling of data with inputs */}
            <Address address1={setAddressLine1} address2={setAddressLine2} postcode={setPostcode} city={setCity} state={setState}/>
            <Phone phone={setPhone}/>
            <Button className="next-button" name="Submit"/>
            </form>
        </section>
        </div>
    );
}