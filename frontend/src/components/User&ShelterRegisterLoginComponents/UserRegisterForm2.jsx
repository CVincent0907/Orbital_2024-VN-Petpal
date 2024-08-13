import React, { useState } from "react";
import Buttons from "./Buttons";
import Country from "./Country";
import UserAddress from "./UserAddress";

export default function UserRegisterForm2({goBack, handleSubmit, setData, setAddress}) {
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [postcode, setPostcode] = useState("");
    const [state, setState] = useState("")
    const [city, setCity] = useState("");

    const goToNextPage = (e) => {
        e.preventDefault();
        if (!name) {
            alert("Display name is required.");
            return;
        }
        // If address is entered, then country is required (to be updated)
        // TODO: improve address handling
        if (address1 || address2 || postcode || state || city) {
            if (!country) {
                alert("Country is required if an address is entered.");
                return;
            }
            setAddress((address) => ({
                address_line_1: address1,
                address_line_2: address2,
                postcode: postcode,
                city: city,
                state: state,
                country: country,
            }));
        }
        if (!country && (address1 || address2 || postcode || state || city)) {
            alert("Country is required if an address is entered.");
            return;
        }
        setData((data) => ({
            ...data,
            display_name: name,
            country: country,
        }));
        handleSubmit();
    }

    return (
        <div className="user-register-form1">
             <section className="RegisterFormSection">
                <form className="registerForm" onSubmit={goToNextPage}>
                    <label className="input-field-name" for="Display-name">Display-name:</label>
                    <input type="text" placeholder="Display-name" id="Display-name" name="Display-name" required 
                        onChange={(e) => setName(e.target.value)}
                    />
                    <br/><br/>
                    <Country name="Country (Optional):" country={setCountry}/>
                    <UserAddress address={setAddress1} optional={setAddress2} postcode={setPostcode} city={setCity} state={setState}/>
                    <Buttons name1="Back" name2="Done" onClick1={goBack} onClick2={goToNextPage} />
                </form>
            </section>
        </div>
    )
}