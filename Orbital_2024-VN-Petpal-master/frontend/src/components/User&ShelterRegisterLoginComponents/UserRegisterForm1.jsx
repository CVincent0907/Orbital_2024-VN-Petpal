import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Buttons from "./Buttons";
import Country from "./Country";
import UserAddress from "./UserAddress";

export default function UserRegisterForm1() {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [country, setCountry] = useState(null);
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [postcode, setPostcode] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    const goToNextPage = (e) => {
        navigate('/dashboard')
    }

    const goToBackPage = (e) => {
        navigate('/userregister')
    }


    return (
        <div className="user-register-form1">
             <section className="RegisterFormSection">
                <form className="registerForm" >
                    <label className="input-field-name" for="Display-name">Display-name:</label>
                    <input type="text" placeholder="Display-name" id="Display-name" name="Display-name" autoFocus="true" required 
                        onChange={(e) => setName(prev=>setName(e.target.value))}
                    />
                    <br/><br/>
                    <Country name="Country (Optional):" country={setCountry}/>
                    <UserAddress address={setAddress1} optional={setAddress2} postcode={setPostcode} city={setCity} state={setState}/>
                    <Buttons name1="Back" name2="Done" onClick1={goToBackPage} onClick2={goToNextPage} />
                </form>
            </section>
        </div>
    )
}